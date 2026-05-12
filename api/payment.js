/* Vercel serverless function — customer submits a payment claim.
 * Writes to Supabase `payments` table with status='pending'.
 * Sends notification email to admin so they can verify.
 * Returns 200 on success so the form feels responsive. */

import { getSupabase } from './_supabase.js';

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'rawfanwala@gmail.com';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev';

const VALID_METHODS = ['bkash', 'nagad', 'rocket', 'upay'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body || {};
  const refId         = (data.refId || '').toString().trim().toUpperCase();
  const method        = (data.method || '').toString().trim().toLowerCase();
  const transactionId = (data.transactionId || '').toString().trim().toUpperCase();
  const senderPhone   = (data.senderPhone || '').toString().trim();
  const customerName  = (data.customerName || '').toString().trim();
  const customerEmail = (data.customerEmail || '').toString().trim();
  const amount        = Number(data.amount) || null;
  const note          = (data.note || '').toString().trim();

  if (!refId) return res.status(400).json({ error: 'Missing refId' });
  if (!VALID_METHODS.includes(method)) return res.status(400).json({ error: 'Invalid payment method' });
  if (!transactionId || transactionId.length < 5) return res.status(400).json({ error: 'Invalid TrxID' });
  if (!senderPhone || !/^01[3-9]\d{8}$/.test(senderPhone)) return res.status(400).json({ error: 'Invalid Bangladeshi phone' });

  const summary = {
    receivedAt: new Date().toISOString(),
    refId, method, transactionId, senderPhone, customerName, customerEmail, amount, note,
    ip: req.headers['x-forwarded-for'] || '',
    ua: req.headers['user-agent'] || '',
  };
  console.log('NEW PAYMENT', JSON.stringify(summary));

  // ---- 1. Persist to Supabase ----
  const supa = getSupabase();
  if (!supa) return res.status(503).json({ error: 'Database not configured' });

  const { data: inserted, error: insertErr } = await supa
    .from('payments')
    .insert({
      ref_id:         refId,
      method,
      transaction_id: transactionId,
      amount,
      customer_name:  customerName || null,
      customer_phone: senderPhone,
      customer_email: customerEmail || null,
      note:           note || null,
      ip:             summary.ip || null,
      ua:             summary.ua || null,
    })
    .select('id')
    .single();

  if (insertErr) {
    console.error('Supabase insert error', insertErr);
    // Common case: duplicate TrxID — return 200 anyway so frontend keeps user happy
    if ((insertErr.message || '').toLowerCase().includes('duplicate')) {
      return res.status(200).json({ ok: true, duplicate: true });
    }
    return res.status(500).json({ error: 'Failed to record payment' });
  }

  // ---- 2. Notify admin via Resend (best-effort) ----
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const html = `
        <h2>💰 New Payment Claim — ${refId}</h2>
        <p><strong>Method:</strong> ${method.toUpperCase()}</p>
        <p><strong>Transaction ID:</strong> <code>${escape(transactionId)}</code></p>
        <p><strong>Amount:</strong> ${amount ? `BDT ${Number(amount).toLocaleString('en-IN')}` : '<em>not provided</em>'}</p>
        <p><strong>Customer:</strong> ${escape(customerName) || '<em>?</em>'} (<a href="tel:${escape(senderPhone)}">${escape(senderPhone)}</a>)</p>
        <p><strong>Email:</strong> ${escape(customerEmail) || '<em>not provided</em>'}</p>
        ${note ? `<p><strong>Note:</strong> ${escape(note)}</p>` : ''}
        <hr/>
        <p>Verify this in the admin panel: <a href="https://websitelagbo.com/admin">/admin → Payments</a></p>
        <p style="color:#888;font-size:12px">${summary.receivedAt} · ${escape(summary.ip)}</p>
      `;
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Website Lagbo <${FROM_EMAIL}>`,
          to: [TO_EMAIL],
          subject: `💰 Payment claim — ${refId} · ${method.toUpperCase()} · ${transactionId}`,
          html,
        }),
      });
    } catch (e) {
      console.error('Resend notify error', e);
    }
  }

  return res.status(200).json({ ok: true, paymentId: inserted?.id });
}

function escape(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
