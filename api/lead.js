/* Vercel serverless function — receives Pricing-page lead submissions.
   - Writes the lead into Supabase `leads` table (if SUPABASE_* env set).
   - Sends an email via Resend (if RESEND_API_KEY env set).
   - Both are best-effort: a failure in one doesn't block the other.
   - Always returns 200 so the form feels successful even on partial outage. */

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

  // Minimum field validation — block empty-body / spam submissions.
  const name = (data.name || '').toString().trim();
  const phone = (data.phone || '').toString().trim();
  if (!name || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name and phone' });
  }
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid Bangladeshi phone number' });
  }

  const refId = data.refId || 'WL-' + Math.floor(10000 + Math.random() * 89999);

  const summary = {
    refId,
    receivedAt: new Date().toISOString(),
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    business: data.business || '',
    note: data.note || '',
    type: data.type || '',
    features: data.features || [],
    duration: data.duration || '',
    addons: data.addons || [],
    pricing: data.pricing || {},
    lang: data.lang || '',
    ip: req.headers['x-forwarded-for'] || '',
    ua: req.headers['user-agent'] || '',
  };

  console.log('NEW LEAD', JSON.stringify(summary));

  // ---- 1. Persist to Supabase (best-effort) ----
  const supa = getSupabase();
  if (supa) {
    try {
      const { error: insertErr } = await supa.from('leads').insert({
        ref_id:       refId,
        name:         summary.name,
        phone:        summary.phone,
        email:        summary.email || null,
        business:     summary.business || null,
        note:         summary.note || null,
        type:         summary.type || null,
        features:     summary.features || [],
        duration:     typeof summary.duration === 'number' ? summary.duration : null,
        addons:       summary.addons || [],
        pricing:      summary.pricing || {},
        lang:         summary.lang || 'bn',
        ip:           summary.ip || null,
        ua:           summary.ua || null,
        payload:      data,
      });
      if (insertErr) console.error('Supabase insert error', insertErr);
    } catch (e) {
      console.error('Supabase exception', e);
    }
  }

  // ---- 2. Send email via Resend (best-effort) ----
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const html = `
        <h2>🎉 New Quote Request — ${refId}</h2>
        <p><strong>Name:</strong> ${escape(summary.name)}</p>
        <p><strong>Phone:</strong> <a href="tel:${escape(summary.phone)}">${escape(summary.phone)}</a></p>
        <p><strong>Email:</strong> ${escape(summary.email) || '<em>not provided</em>'}</p>
        <p><strong>Business:</strong> ${escape(summary.business) || '<em>not provided</em>'}</p>
        <p><strong>Site type:</strong> ${escape(summary.type)}</p>
        <p><strong>Features:</strong> ${(summary.features || []).map(escape).join(', ') || '<em>none</em>'}</p>
        <p><strong>Service duration:</strong> ${escape(summary.duration)} months</p>
        <p><strong>Add-ons:</strong> ${(summary.addons || []).map(escape).join(', ') || '<em>none</em>'}</p>
        <p><strong>Estimated total:</strong> BDT ${(summary.pricing?.total || 0).toLocaleString('en-IN')}</p>
        <p><strong>Note:</strong> ${escape(summary.note) || '<em>none</em>'}</p>
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
          subject: `🎉 New quote request — ${refId} · ${summary.name}`,
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

  return res.status(200).json({ ok: true, refId });
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
