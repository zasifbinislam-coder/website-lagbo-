/* Lightweight health endpoint for uptime checks (UptimeRobot, BetterStack, etc.).
   Returns OK if the function runtime is alive — does NOT depend on any
   external service, so it's a "is the deployment up?" probe, not a full
   end-to-end check. */
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    ok: true,
    service: 'website-lagbo',
    time: new Date().toISOString(),
    region: process.env.VERCEL_REGION || 'unknown',
  });
}
