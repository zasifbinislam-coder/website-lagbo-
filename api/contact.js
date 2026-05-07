/* Vercel serverless function — receives Contact-page messages.
   - Writes the message into Supabase `contact_messages` table.
   - Sends an email via Resend.
   - Best-effort on both; always returns 200. */

import { getSupabase } from './_supabase.js';

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'websitelagbo@gmail.com';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body || {};
  const summary = {
    receivedAt: new Date().toISOString(),
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    subject: data.subject || '',
    message: data.message || '',
    lang: data.lang || '',
    ip: req.headers['x-forwarded-for'] || '',
    ua: req.headers['user-agent'] || '',
  };

  console.log('NEW CONTACT MESSAGE', JSON.stringify(summary));

  // ---- 1. Persist to Supabase ----
  const supa = getSupabase();
  if (supa) {
    try {
      const { error: insertErr } = await supa.from('contact_messages').insert({
        name:    summary.name,
        phone:   summary.phone,
        email:   summary.email || null,
        subject: summary.subject || null,
        message: summary.message,
        lang:    summary.lang || 'bn',
        ip:      summary.ip || null,
        ua:      summary.ua || null,
      });
      if (insertErr) console.error('Supabase insert error', insertErr);
    } catch (e) {
      console.error('Supabase exception', e);
    }
  }

  // ---- 2. Email via Resend ----
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const html = `
        <h2>📨 New Contact Message</h2>
        <p><strong>Name:</strong> ${escape(summary.name)}</p>
        <p><strong>Phone:</strong> <a href="tel:${escape(summary.phone)}">${escape(summary.phone)}</a></p>
        <p><strong>Email:</strong> ${escape(summary.email) || '<em>not provided</em>'}</p>
        <p><strong>Subject:</strong> ${escape(summary.subject) || '<em>not provided</em>'}</p>
        <hr/>
        <p style="white-space:pre-wrap">${escape(summary.message)}</p>
        <hr/>
        <p style="color:#888;font-size:12px">${summary.receivedAt} · ${escape(summary.lang)} · ${escape(summary.ip)}</p>
      `;
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Website Lagbo <${FROM_EMAIL}>`,
          to: [TO_EMAIL],
          subject: `📨 ${summary.subject || 'Contact'} — ${summary.name}`,
          html,
          reply_to: summary.email || undefined,
        }),
      });
      if (!r.ok) {
        const text = await r.text();
        console.error('Resend error', r.status, text);
      }
    } catch (e) {
      console.error('Resend exception', e);
    }
  }

  return res.status(200).json({ ok: true });
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
