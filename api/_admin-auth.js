/* Shared admin auth check.
 * Compares the Authorization: Bearer <token> header against
 * process.env.ADMIN_TOKEN using a timing-safe comparison so the
 * endpoint can't be brute-forced by measuring response time. */

import { timingSafeEqual } from 'node:crypto';

export function isAdmin(req) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const header = req.headers.authorization || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
