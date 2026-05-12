/* Admin endpoint — lists all contact-form messages, or updates a
 * message's status. Protected by ADMIN_TOKEN bearer header. */

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
      .from('contact_messages')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(500);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ messages: data || [] });
  }

  if (req.method === 'PATCH') {
    const body = req.body || {};
    const id = (body.id || '').toString().trim();
    const status = (body.status || '').toString().trim();
    const VALID = ['new', 'replied', 'closed'];
    if (!id || !VALID.includes(status)) {
      return res.status(400).json({ error: 'id required and status must be one of ' + VALID.join(', ') });
    }
    const { error } = await supa.from('contact_messages').update({ status }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
