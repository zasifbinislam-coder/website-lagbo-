/* Admin endpoint — lists all leads, or updates a lead's status.
 * Protected by ADMIN_TOKEN bearer header. */

import { getSupabase } from '../_supabase.js';
import { isAdmin } from '../_admin-auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!isAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supa = getSupabase();
  if (!supa) return res.status(503).json({ error: 'Database not configured' });

  if (req.method === 'GET') {
    const { data, error } = await supa
      .from('leads')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(500);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ leads: data || [] });
  }

  if (req.method === 'PATCH') {
    const body = req.body || {};
    const refId = (body.refId || '').toString().trim();
    const status = (body.status || '').toString().trim();
    const VALID = ['new', 'called', 'building', 'review', 'live', 'refunded', 'cancelled'];
    if (!refId || !VALID.includes(status)) {
      return res.status(400).json({ error: 'refId required and status must be one of ' + VALID.join(', ') });
    }
    const { error } = await supa.from('leads').update({ status }).eq('ref_id', refId);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
