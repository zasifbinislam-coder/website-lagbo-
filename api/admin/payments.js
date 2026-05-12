/* Admin endpoint — lists pending/all payments, or verifies/rejects one.
 * On verify: sends customer a receipt email via Resend.
 * Protected by ADMIN_TOKEN bearer header. */

import { getSupabase } from '../_supabase.js';
import { isAdmin } from '../_admin-auth.js';

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'rawfanwala@gmail.com';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const supa = getSupabase();
  if (!supa) return res.status(503).json({ error: 'Database not configured' });

  if (req.method === 'GET') {
    const { data, error } = await supa
      .from('payments')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(500);
    if (error) {
      // Table might not exist yet — return helpful hint
      if ((error.message || '').toLowerCase().includes('relation') || error.code === '42P01') {
        return res.status(503).json({
          error: 'payments table missing',
          hint: 'Re-run schema.sql in Supabase to create the payments table.',
        });
      }
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ payments: data || [] });
  }

  if (req.method === 'PATCH') {
    const body = req.body || {};
    const id = (body.id || '').toString().trim();
    const action = (body.action || '').toString().trim();
    const rejectionReason = (body.rejectionReason || '').toString().trim();

    if (!id || !['verify', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'id and action (verify|reject) required' });
    }

    const update = action === 'verify'
      ? { status: 'verified', verified_at: new Date().toISOString(), verified_by: 'admin', rejection_reason: null }
      : { status: 'rejected', rejection_reason: rejectionReason || null };

    const { data: updated, error } = await supa
      .from('payments')
      .update(update)
      .eq('id', id)
      .select('*')
      .single();

    if (error) return res.status(500).json({ error: error.message });

    // Send receipt email on verify (best-effort)
    if (action === 'verify' && updated?.customer_email && process.env.RESEND_API_KEY) {
      try {
        await sendReceiptEmail(updated);
      } catch (e) {
        console.error('Receipt email failed', e);
      }
    }

    return res.status(200).json({ ok: true, payment: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function sendReceiptEmail(payment) {
  const apiKey = process.env.RESEND_API_KEY;
  const verifiedAt = new Date(payment.verified_at || Date.now()).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const amount = payment.amount
    ? `BDT ${Number(payment.amount).toLocaleString('en-IN')}`
    : '—';

  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:auto;background:#ffffff;color:#1f2937;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#6366f1,#ec4899);padding:24px;color:#fff;text-align:center">
        <div style="font-size:13px;letter-spacing:2px;font-weight:700;opacity:0.9">WEBSITE LAGBO</div>
        <h1 style="margin:8px 0 0;font-size:24px;font-weight:800">✅ Payment Receipt</h1>
        <div style="opacity:0.9;font-size:13px;margin-top:6px">Thank you for your payment</div>
      </div>
      <div style="padding:24px">
        <p style="font-size:15px;margin:0 0 18px">
          Hello ${escape(payment.customer_name || 'there')},<br/>
          We've verified your payment for order <strong>${escape(payment.ref_id)}</strong>. Below is your receipt.
        </p>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#6b7280">Order ID</td><td style="text-align:right;font-weight:700;font-family:monospace">${escape(payment.ref_id)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Payment method</td><td style="text-align:right;font-weight:700;text-transform:capitalize">${escape(payment.method)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Transaction ID</td><td style="text-align:right;font-weight:700;font-family:monospace">${escape(payment.transaction_id)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Amount</td><td style="text-align:right;font-weight:800;font-size:18px;color:#10b981">${amount}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Verified on</td><td style="text-align:right">${escape(verifiedAt)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Paid from</td><td style="text-align:right">${escape(payment.customer_phone || '—')}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;color:#166534;font-size:13.5px">
          ✓ Your payment is confirmed. Your project is moving forward — we'll keep you updated.
        </div>
        <p style="font-size:13px;color:#6b7280;margin:18px 0 0;line-height:1.6">
          Questions? Reply to this email or message us on WhatsApp: <a href="https://wa.me/8801805625151" style="color:#6366f1">01805-625151</a>.
          Track your order status at <a href="https://websitelagbo.com/track" style="color:#6366f1">websitelagbo.com/track</a>.
        </p>
      </div>
      <div style="padding:16px 24px;background:#f9fafb;color:#9ca3af;font-size:11.5px;text-align:center">
        Website Lagbo · Dhanmondi 10, Dhaka · websitelagbo.com
      </div>
    </div>
  `;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Website Lagbo <${FROM_EMAIL}>`,
      to: [payment.customer_email],
      bcc: [TO_EMAIL],
      subject: `✅ Payment Receipt — ${payment.ref_id} · BDT ${payment.amount || '?'}`,
      html,
      reply_to: TO_EMAIL,
    }),
  });
  if (!r.ok) {
    const text = await r.text();
    console.error('Resend receipt error', r.status, text);
  }
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
