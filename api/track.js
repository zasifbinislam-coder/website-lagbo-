/* Vercel serverless function — looks up a lead by ref_id from Supabase.
 * Returns a small "public-safe" projection so the customer can see status
 * and timeline without exposing internal fields like IP / UA / payload. */

import { getSupabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const refId = (req.query.ref || req.query.refId || '').toString().trim();
  if (!refId) return res.status(400).json({ error: 'Missing ref query parameter' });

  const supa = getSupabase();
  if (!supa) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  const { data, error } = await supa
    .from('leads')
    .select('ref_id, submitted_at, name, type, features, duration, pricing, status, lang')
    .ilike('ref_id', refId) // case-insensitive match
    .maybeSingle();

  if (error) {
    console.error('Supabase select error', error);
    return res.status(500).json({ error: 'Lookup failed' });
  }
  if (!data) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({
    ok: true,
    lead: {
      refId: data.ref_id,
      submittedAt: data.submitted_at,
      name: data.name,
      type: data.type,
      features: data.features || [],
      duration: data.duration,
      pricing: data.pricing || {},
      status: data.status || 'new',
      lang: data.lang || 'bn',
    },
  });
}
