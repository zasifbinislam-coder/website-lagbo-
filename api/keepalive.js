/* Keep-warm cron target. Runs a tiny, PII-free DB ping (head-only count)
   so the Supabase free-tier project registers daily activity and does not
   auto-pause after ~7 idle days. Returns a status summary only — never any
   row data. Always 200 so the cron itself doesn't page; the point is just
   to generate one authenticated request against the database each day. */

import { getSupabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const supa = getSupabase();
  if (!supa) {
    return res.status(200).json({ ok: true, db: 'unconfigured' });
  }

  try {
    // head:true => returns only a count, zero rows, zero PII.
    const { error } = await supa
      .from('leads')
      .select('id', { count: 'exact', head: true });
    if (error) {
      return res.status(200).json({ ok: true, db: 'error', detail: error.message });
    }
    return res.status(200).json({ ok: true, db: 'warm', time: new Date().toISOString() });
  } catch (e) {
    return res.status(200).json({ ok: true, db: 'unreachable', detail: e.message });
  }
}
