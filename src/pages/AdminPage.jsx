/* AdminPage — private dashboard for viewing leads, contact messages, and payments.
 *
 * Access:
 *   - Reach via URL: https://websitelagbo.com/admin
 *   - Gated by a password (server's ADMIN_TOKEN env var). On success the
 *     token is stored in localStorage so the gate doesn't reappear.
 *
 * Not linked from anywhere in the public UI. Hidden from robots.txt.
 */

import { useEffect, useMemo, useState } from 'react';
import { formatBDT } from '../utils.js';
import { MFS_INFO } from '../data/content.js';
import { buildOrderPrompt } from '../promptBuilder.js';

const TOKEN_KEY = 'wl_admin_token';

const STATUS_OPTIONS = ['new', 'called', 'building', 'review', 'live', 'refunded', 'cancelled'];
const STATUS_COLOR = {
  new:        { bg: '#6366f155', text: '#c7d2fe' },
  called:     { bg: '#0ea5e955', text: '#bae6fd' },
  building:   { bg: '#f59e0b55', text: '#fde68a' },
  review:     { bg: '#a855f755', text: '#e9d5ff' },
  live:       { bg: '#10b98155', text: '#a7f3d0' },
  refunded:   { bg: '#64748b55', text: '#cbd5e1' },
  cancelled:  { bg: '#ef444455', text: '#fecaca' },
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const phoneHref = (phone) => `tel:${(phone || '').replace(/\s|-/g, '')}`;
const whatsappHref = (phone) => {
  const digits = (phone || '').replace(/\D/g, '');
  const intl = digits.startsWith('880') ? digits : '88' + digits;
  return `https://wa.me/${intl}`;
};

/* ---------------- Login gate ---------------- */

function LoginGate({ onAuthenticated }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!pw.trim()) return;
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { Authorization: `Bearer ${pw.trim()}` },
      });
      if (res.status === 401) {
        setErr('Wrong password.');
        return;
      }
      if (!res.ok) {
        setErr(`Server error: ${res.status}`);
        return;
      }
      localStorage.setItem(TOKEN_KEY, pw.trim());
      onAuthenticated(pw.trim());
    } catch (e) {
      setErr('Network error.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="absolute inset-0 grid place-items-center bg-[#07091a]">
      <form
        onSubmit={submit}
        className="w-full max-w-sm mx-5 rounded-2xl p-6 md:p-7 border border-white/10 bg-white/[0.03]"
      >
        <div className="text-[11px] font-extrabold tracking-wider text-white/45 uppercase mb-2">
          Admin Access
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-5">
          Enter password
        </h1>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          autoComplete="current-password"
          placeholder="••••••••••"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400 mb-3"
        />
        {err && (
          <div className="text-[12.5px] text-rose-300 mb-3">{err}</div>
        )}
        <button
          type="submit"
          disabled={busy || !pw.trim()}
          className="btn-primary w-full font-extrabold py-3 rounded-xl disabled:opacity-60"
        >
          {busy ? 'Checking…' : 'Sign in'}
        </button>
        <div className="text-[11px] text-white/35 mt-4 text-center">
          Wrong page? <a href="/" className="text-indigo-300 hover:text-white">Go home</a>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Stat cards ---------------- */

function Stats({ leads, messages, payments }) {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const todayLeads = leads.filter((l) => now - new Date(l.submitted_at).getTime() < oneDay).length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const newMsgs = messages.filter((m) => (m.status || 'new') === 'new').length;
  const pendingPayments = payments.filter((p) => p.status === 'pending').length;
  const verifiedRevenue = payments
    .filter((p) => p.status === 'verified')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const Card = ({ label, value, tint }) => (
    <div
      className="rounded-2xl p-4 border border-white/10"
      style={{ background: tint || 'rgba(255,255,255,0.03)' }}
    >
      <div className="text-[10.5px] font-extrabold tracking-wider text-white/55 uppercase">
        {label}
      </div>
      <div className="font-display font-extrabold text-2xl md:text-3xl text-white mt-1 tabular-nums">
        {value}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      <Card label="New leads"        value={newLeads}        tint="rgba(99,102,241,0.10)" />
      <Card label="Today"            value={todayLeads}/>
      <Card label="Unread msgs"      value={newMsgs}         tint="rgba(236,72,153,0.10)" />
      <Card label="Pending payments" value={pendingPayments} tint="rgba(245,158,11,0.10)" />
      <Card label="Verified BDT"     value={verifiedRevenue ? formatBDT(verifiedRevenue) : '—'} tint="rgba(16,185,129,0.10)" />
    </div>
  );
}

/* ---------------- Lead row (expandable) ---------------- */

function LeadRow({ lead, token, onStatusChanged }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ refId: lead.ref_id, status }),
      });
      if (res.ok) onStatusChanged(lead.ref_id, status);
    } finally {
      setUpdating(false);
    }
  };

  const color = STATUS_COLOR[lead.status] || STATUS_COLOR.new;
  const total = lead.pricing?.total || 0;

  return (
    <>
      <tr className="border-t border-white/5 hover:bg-white/[0.02]">
        <td className="px-3 py-3 text-[11.5px] text-white/55 whitespace-nowrap">{fmtDate(lead.submitted_at)}</td>
        <td className="px-3 py-3 font-mono text-[12px] text-white">{lead.ref_id}</td>
        <td className="px-3 py-3 text-[13px] text-white">{lead.name}</td>
        <td className="px-3 py-3 text-[12.5px] whitespace-nowrap">
          <a href={phoneHref(lead.phone)} className="text-indigo-300 hover:text-white">{lead.phone}</a>
          {' · '}
          <a href={whatsappHref(lead.phone)} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-white">WA</a>
        </td>
        <td className="px-3 py-3 text-[12.5px] text-white/75">{lead.type || '—'}</td>
        <td className="px-3 py-3 text-[12.5px] text-white font-mono tabular-nums whitespace-nowrap">
          {total > 0 ? formatBDT(total) : '—'}
        </td>
        <td className="px-3 py-3">
          <select
            value={lead.status || 'new'}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={updating}
            className="text-[11.5px] font-bold rounded-md border border-white/15 px-2 py-1 outline-none focus:border-indigo-400"
            style={{ background: color.bg, color: color.text }}
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s} style={{ background: '#0b0d1f', color: '#fff' }}>{s}</option>)}
          </select>
        </td>
        <td className="px-3 py-3">
          <button onClick={() => setOpen(!open)} className="text-[11.5px] font-bold text-white/65 hover:text-white">
            {open ? '▾' : '▸'}
          </button>
        </td>
      </tr>
      {open && (
        <tr className="bg-white/[0.015]">
          <td colSpan={8} className="px-5 py-4 text-[12.5px]">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Detail label="Email" value={lead.email || '—'} />
                <Detail label="Business" value={lead.business || '—'} />
                <Detail label="Duration" value={lead.duration ? `${lead.duration} months` : '—'} />
                <Detail label="Lang" value={lead.lang || '—'} />
              </div>
              <div>
                <Detail label="Features" value={(lead.features || []).join(', ') || '—'} />
                <Detail label="Add-ons" value={(lead.addons || []).join(', ') || '—'} />
                <Detail label="IP" value={lead.ip || '—'} mono />
                <Detail label="UA" value={lead.ua || '—'} mono truncate />
              </div>
            </div>
            {lead.note && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <Detail label="Customer note" value={lead.note} />
              </div>
            )}
            {lead.pricing && Object.keys(lead.pricing).length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-[11.5px] font-bold text-white/55 hover:text-white">Pricing breakdown</summary>
                <pre className="mt-2 text-[11.5px] text-white/65 bg-black/30 p-3 rounded-md overflow-x-auto">{JSON.stringify(lead.pricing, null, 2)}</pre>
              </details>
            )}
            <PromptBlock lead={lead} />
          </td>
        </tr>
      )}
    </>
  );
}

/* Generates a plain-language "build this website" prompt from the order's
   selected features, ready to paste into Claude Code. Hidden until asked,
   shown in a read-only textarea with a one-click copy button. */
function PromptBlock({ lead }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => buildOrderPrompt(lead), [lead]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.getElementById(`prompt-${lead.ref_id}`);
      if (ta) { ta.focus(); ta.select(); document.execCommand('copy'); }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-4 pt-3 border-t border-white/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Claude Code build prompt</div>
        <button
          onClick={() => setShow((s) => !s)}
          className="text-[11.5px] font-bold rounded-md border border-indigo-400/40 bg-indigo-500/10 px-3 py-1.5 text-indigo-200 hover:bg-indigo-500/20"
        >
          {show ? 'Hide prompt' : '✦ Generate prompt'}
        </button>
      </div>
      {show && (
        <div className="mt-3">
          <textarea
            id={`prompt-${lead.ref_id}`}
            readOnly
            value={prompt}
            onFocus={(e) => e.target.select()}
            className="w-full h-72 text-[12px] leading-relaxed font-mono text-white/85 bg-black/40 border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-400 resize-y"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={copy}
              className="text-[12px] font-extrabold rounded-md bg-indigo-500 hover:bg-indigo-400 px-4 py-2 text-white"
            >
              {copied ? 'Copied ✓' : 'Copy prompt'}
            </button>
            <span className="text-[11px] text-white/40">Paste this into Claude Code to build the customer’s site.</span>
          </div>
        </div>
      )}
    </div>
  );
}

const Detail = ({ label, value, mono, truncate }) => (
  <div className="flex gap-3 py-1">
    <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 shrink-0 w-20">{label}</div>
    <div className={`${mono ? 'font-mono text-[11.5px]' : 'text-[12.5px]'} text-white/85 ${truncate ? 'truncate' : 'break-words'} flex-1`}>{value}</div>
  </div>
);

/* ---------------- Contact-message row ---------------- */

function MessageRow({ msg }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className="border-t border-white/5 hover:bg-white/[0.02]">
        <td className="px-3 py-3 text-[11.5px] text-white/55 whitespace-nowrap">{fmtDate(msg.submitted_at)}</td>
        <td className="px-3 py-3 text-[13px] text-white">{msg.name}</td>
        <td className="px-3 py-3 text-[12.5px] whitespace-nowrap">
          <a href={phoneHref(msg.phone)} className="text-indigo-300 hover:text-white">{msg.phone}</a>
          {' · '}
          <a href={whatsappHref(msg.phone)} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-white">WA</a>
        </td>
        <td className="px-3 py-3 text-[12.5px] text-white/75">{msg.subject || '—'}</td>
        <td className="px-3 py-3 text-[12.5px] text-white/80 max-w-md">
          <span className="line-clamp-2">{msg.message}</span>
        </td>
        <td className="px-3 py-3">
          <button onClick={() => setOpen(!open)} className="text-[11.5px] font-bold text-white/65 hover:text-white">
            {open ? '▾' : '▸'}
          </button>
        </td>
      </tr>
      {open && (
        <tr className="bg-white/[0.015]">
          <td colSpan={6} className="px-5 py-4 text-[12.5px]">
            <Detail label="Email" value={msg.email || '—'} />
            <Detail label="Lang" value={msg.lang || '—'} />
            <Detail label="IP" value={msg.ip || '—'} mono />
            <Detail label="UA" value={msg.ua || '—'} mono truncate />
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2">Full message</div>
              <div className="text-[13px] text-white/85 whitespace-pre-wrap">{msg.message}</div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ---------------- Payment row (verify/reject inline) ---------------- */

const PAYMENT_STATUS_COLOR = {
  pending:  { bg: '#f59e0b55', text: '#fde68a', label: 'pending' },
  verified: { bg: '#10b98155', text: '#a7f3d0', label: 'verified' },
  rejected: { bg: '#ef444455', text: '#fecaca', label: 'rejected' },
};

function PaymentRow({ payment, token, onChanged }) {
  const [open, setOpen] = useState(payment.status === 'pending');
  const [busy, setBusy] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const mfs = MFS_INFO[payment.method] || {};
  const color = PAYMENT_STATUS_COLOR[payment.status] || PAYMENT_STATUS_COLOR.pending;

  const act = async (action, reason) => {
    setBusy(true);
    try {
      const r = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: payment.id, action, rejectionReason: reason }),
      });
      if (r.ok) {
        const d = await r.json();
        onChanged(payment.id, d.payment);
        setShowReject(false);
      }
    } finally {
      setBusy(false);
    }
  };

  const waText = encodeURIComponent(
    `Salam ${payment.customer_name || ''}, apnar Website Lagbo order ${payment.ref_id} -er payment (TrxID: ${payment.transaction_id}) verify hoyese. Receipt email-e pathiyechi. Dhonnobad!`
  );

  return (
    <>
      <tr className="border-t border-white/5 hover:bg-white/[0.02]">
        <td className="px-3 py-3 text-[11.5px] text-white/55 whitespace-nowrap">{fmtDate(payment.submitted_at)}</td>
        <td className="px-3 py-3 font-mono text-[12px] text-white">{payment.ref_id}</td>
        <td className="px-3 py-3">
          <span className="text-[12px] font-bold px-2 py-1 rounded-md" style={{ background: (mfs.color || '#666') + '33', color: mfs.color || '#fff' }}>
            {mfs.name || payment.method}
          </span>
        </td>
        <td className="px-3 py-3 font-mono text-[12px] text-white tabular-nums break-all">{payment.transaction_id}</td>
        <td className="px-3 py-3 text-[12.5px] text-white font-mono tabular-nums whitespace-nowrap">
          {payment.amount ? formatBDT(payment.amount) : '—'}
        </td>
        <td className="px-3 py-3 text-[12.5px] whitespace-nowrap">
          <div className="text-white">{payment.customer_name || '—'}</div>
          {payment.customer_phone && (
            <div className="text-[11.5px]">
              <a href={phoneHref(payment.customer_phone)} className="text-indigo-300 hover:text-white">{payment.customer_phone}</a>
              {' · '}
              <a href={whatsappHref(payment.customer_phone) + '?text=' + waText} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-white">WA</a>
            </div>
          )}
        </td>
        <td className="px-3 py-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md" style={{ background: color.bg, color: color.text }}>
            {color.label}
          </span>
        </td>
        <td className="px-3 py-3">
          <button onClick={() => setOpen(!open)} className="text-[11.5px] font-bold text-white/65 hover:text-white">
            {open ? '▾' : '▸'}
          </button>
        </td>
      </tr>
      {open && (
        <tr className="bg-white/[0.015]">
          <td colSpan={8} className="px-5 py-4 text-[12.5px]">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Detail label="Email" value={payment.customer_email || '—'} />
                <Detail label="Sent to" value={mfs.number || '—'} mono />
                <Detail label="Method" value={mfs.name || payment.method} />
                <Detail label="Note" value={payment.note || '—'} />
              </div>
              <div>
                <Detail label="Submitted" value={fmtDate(payment.submitted_at)} />
                {payment.verified_at && <Detail label="Verified" value={fmtDate(payment.verified_at)} />}
                {payment.rejection_reason && <Detail label="Reason" value={payment.rejection_reason} />}
                <Detail label="IP" value={payment.ip || '—'} mono />
                <Detail label="UA" value={payment.ua || '—'} mono truncate />
              </div>
            </div>

            {payment.status === 'pending' && (
              <div className="mt-4 pt-4 border-t border-white/10">
                {!showReject ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => act('verify')}
                      disabled={busy}
                      className="text-[12.5px] font-extrabold px-4 py-2 rounded-lg border border-emerald-400/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 disabled:opacity-60"
                    >
                      ✓ Verify & email receipt
                    </button>
                    <button
                      onClick={() => setShowReject(true)}
                      disabled={busy}
                      className="text-[12.5px] font-bold px-4 py-2 rounded-lg border border-rose-400/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 disabled:opacity-60"
                    >
                      ✕ Reject
                    </button>
                    {payment.customer_phone && (
                      <a
                        href={whatsappHref(payment.customer_phone) + '?text=' + waText}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[12.5px] font-bold px-4 py-2 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white"
                      >
                        🟢 WhatsApp confirm
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 items-center">
                    <input
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Why are you rejecting? (e.g. wrong TrxID)"
                      className="flex-1 min-w-[220px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white outline-none focus:border-rose-400"
                    />
                    <button
                      onClick={() => act('reject', rejectReason)}
                      disabled={busy}
                      className="text-[12.5px] font-extrabold px-4 py-2 rounded-lg border border-rose-400/40 bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 disabled:opacity-60"
                    >
                      Confirm reject
                    </button>
                    <button
                      onClick={() => setShowReject(false)}
                      className="text-[12px] font-bold px-3 py-2 rounded-lg text-white/65 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

/* ---------------- Dashboard ---------------- */

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentsHint, setPaymentsHint] = useState('');
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [lr, mr, pr] = await Promise.all([
        fetch('/api/admin/leads',    { headers }),
        fetch('/api/admin/contacts', { headers }),
        fetch('/api/admin/payments', { headers }),
      ]);
      if (lr.status === 401 || mr.status === 401 || pr.status === 401) {
        onLogout();
        return;
      }
      if (lr.ok) setLeads((await lr.json()).leads || []);
      if (mr.ok) setMessages((await mr.json()).messages || []);
      if (pr.ok) {
        setPayments((await pr.json()).payments || []);
        setPaymentsHint('');
      } else {
        const d = await pr.json().catch(() => ({}));
        setPayments([]);
        setPaymentsHint(d.hint || d.error || '');
      }
    } catch (e) {
      setError('Failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const onPaymentChanged = (id, updated) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, []);

  const filteredLeads = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        (l.name || '').toLowerCase().includes(q) ||
        (l.phone || '').toLowerCase().includes(q) ||
        (l.ref_id || '').toLowerCase().includes(q) ||
        (l.business || '').toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q)
      );
    });
  }, [leads, filter, statusFilter]);

  const filteredMessages = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((m) =>
      (m.name || '').toLowerCase().includes(q) ||
      (m.phone || '').toLowerCase().includes(q) ||
      (m.subject || '').toLowerCase().includes(q) ||
      (m.message || '').toLowerCase().includes(q)
    );
  }, [messages, filter]);

  const filteredPayments = useMemo(() => {
    const q = filter.trim().toLowerCase();
    // Pending first, then verified, then rejected — within each, newest first (already sorted from API)
    const order = { pending: 0, verified: 1, rejected: 2 };
    const sorted = [...payments].sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));
    if (!q) return sorted;
    return sorted.filter((p) =>
      (p.ref_id || '').toLowerCase().includes(q) ||
      (p.transaction_id || '').toLowerCase().includes(q) ||
      (p.customer_phone || '').toLowerCase().includes(q) ||
      (p.customer_name || '').toLowerCase().includes(q) ||
      (p.method || '').toLowerCase().includes(q)
    );
  }, [payments, filter]);

  const pendingPayments = useMemo(
    () => payments.filter((p) => p.status === 'pending').length,
    [payments]
  );

  const onStatusChanged = (refId, status) => {
    setLeads((prev) => prev.map((l) => (l.ref_id === refId ? { ...l, status } : l)));
  };

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#07091a]">
      <header className="sticky top-0 z-20 backdrop-blur-2xl border-b border-white/10 bg-[#07091a]/85">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-display font-extrabold text-lg text-white">Admin</div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">live</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              disabled={loading}
              className="text-[12px] font-bold px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/85 disabled:opacity-60"
            >
              {loading ? 'Loading…' : '↻ Refresh'}
            </button>
            <button
              onClick={onLogout}
              className="text-[12px] font-bold px-3 py-1.5 rounded-lg border border-rose-400/30 hover:border-rose-400/60 bg-rose-500/10 hover:bg-rose-500/15 text-rose-200"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6">
        <Stats leads={leads} messages={messages} payments={payments} />

        {error && (
          <div className="mb-4 rounded-xl p-3 border border-rose-400/30 bg-rose-500/10 text-rose-200 text-[13px]">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex rounded-xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setTab('leads')}
              className={`text-[12.5px] font-bold px-4 py-2 ${tab === 'leads' ? 'bg-white text-gray-900' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
            >
              Leads ({leads.length})
            </button>
            <button
              onClick={() => setTab('messages')}
              className={`text-[12.5px] font-bold px-4 py-2 ${tab === 'messages' ? 'bg-white text-gray-900' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
            >
              Messages ({messages.length})
            </button>
            <button
              onClick={() => setTab('payments')}
              className={`text-[12.5px] font-bold px-4 py-2 ${tab === 'payments' ? 'bg-white text-gray-900' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
            >
              Payments ({payments.length}{pendingPayments > 0 ? ` · ${pendingPayments} pending` : ''})
            </button>
          </div>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search name / phone / ref…"
            className="flex-1 min-w-[220px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white outline-none focus:border-indigo-400"
          />
          {tab === 'leads' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12.5px] font-bold text-white outline-none focus:border-indigo-400"
            >
              <option value="all" style={{ background: '#0b0d1f' }}>All status</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s} style={{ background: '#0b0d1f' }}>{s}</option>)}
            </select>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 overflow-x-auto bg-white/[0.02]">
          {tab === 'leads' && (
            <table className="w-full text-left">
              <thead className="text-[10.5px] font-extrabold uppercase tracking-wider text-white/45">
                <tr>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Ref</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Phone</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Total</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((l) => (
                  <LeadRow key={l.id || l.ref_id} lead={l} token={token} onStatusChanged={onStatusChanged} />
                ))}
                {!loading && filteredLeads.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-10 text-center text-white/45 text-[13px]">No leads match.</td></tr>
                )}
              </tbody>
            </table>
          )}
          {tab === 'messages' && (
            <table className="w-full text-left">
              <thead className="text-[10.5px] font-extrabold uppercase tracking-wider text-white/45">
                <tr>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Phone</th>
                  <th className="px-3 py-3">Subject</th>
                  <th className="px-3 py-3">Message</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((m) => (
                  <MessageRow key={m.id} msg={m} />
                ))}
                {!loading && filteredMessages.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-white/45 text-[13px]">No messages match.</td></tr>
                )}
              </tbody>
            </table>
          )}
          {tab === 'payments' && (
            <>
              {paymentsHint && (
                <div className="px-5 py-4 border-b border-amber-400/30 bg-amber-500/10 text-amber-200 text-[12.5px]">
                  ⚠ {paymentsHint}
                </div>
              )}
              <table className="w-full text-left">
                <thead className="text-[10.5px] font-extrabold uppercase tracking-wider text-white/45">
                  <tr>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Order</th>
                    <th className="px-3 py-3">Method</th>
                    <th className="px-3 py-3">TrxID</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Customer</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <PaymentRow key={p.id} payment={p} token={token} onChanged={onPaymentChanged} />
                  ))}
                  {!loading && filteredPayments.length === 0 && (
                    <tr><td colSpan={8} className="px-5 py-10 text-center text-white/45 text-[13px]">No payments yet.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Page entry ---------------- */

export default function AdminPage() {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
  });

  const logout = () => {
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
    setToken('');
  };

  if (!token) return <LoginGate onAuthenticated={setToken} />;
  return <Dashboard token={token} onLogout={logout} />;
}
