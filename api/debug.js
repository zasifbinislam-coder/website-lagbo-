/* TEMPORARY diagnostic endpoint — checks env vars + tests a real
   Supabase insert + select cycle and returns the actual error. Delete
   this file after we verify the wiring works. */

import { getSupabase } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const out = {
    env: {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_URL_value: process.env.SUPABASE_URL || null,
      SUPABASE_SERVICE_ROLE_KEY_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL || null,
    },
  };

  const supa = getSupabase();
  if (!supa) {
    out.client = 'NOT_CREATED — env vars missing';
    return res.status(200).json(out);
  }
  out.client = 'created';

  // Try to read 0 rows — confirms connectivity + RLS access
  try {
    const { data: r1, error: e1, count } = await supa
      .from('leads')
      .select('ref_id', { count: 'exact', head: true });
    out.read = { ok: !e1, error: e1 ? { message: e1.message, code: e1.code, details: e1.details, hint: e1.hint } : null, count };
  } catch (e) {
    out.read = { exception: String(e) };
  }

  // Try to insert a probe row
  const probeRef = 'PROBE-' + Date.now();
  try {
    const { data: r2, error: e2 } = await supa.from('leads').insert({
      ref_id: probeRef,
      name: 'debug probe',
      phone: '01000000000',
      type: 'debug',
    }).select().single();
    out.insert = {
      ok: !e2,
      error: e2 ? { message: e2.message, code: e2.code, details: e2.details, hint: e2.hint } : null,
      inserted: r2 ? { ref_id: r2.ref_id, id: r2.id } : null,
    };

    // Clean up the probe row
    if (r2) {
      await supa.from('leads').delete().eq('id', r2.id);
    }
  } catch (e) {
    out.insert = { exception: String(e) };
  }

  return res.status(200).json(out);
}
