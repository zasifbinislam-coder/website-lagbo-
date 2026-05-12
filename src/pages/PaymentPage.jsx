/* PaymentPage — customer submits a manual MFS payment claim.
 *
 * Flow:
 *   1. Page loads with order ref (from URL ?ref=WL-XXXX or path /payment/WL-XXXX,
 *      or user types it). Fetches order via /api/track to show amount due.
 *   2. Customer picks an MFS (bKash / Nagad / Rocket / Upay).
 *   3. Page shows instructions + the merchant number to send to.
 *   4. Customer enters TrxID + sender phone + email + amount.
 *   5. Submit → POST /api/payment → success screen.
 *
 * Admin verifies in /admin → Payments tab, which triggers the receipt email.
 */

import { useEffect, useMemo, useState } from 'react';
import PageShell from './PageShell.jsx';
import { t, MFS_INFO } from '../data/content.js';
import { formatBDT } from '../utils.js';

const ACCENT = '#6366f1';

const readRefFromUrl = () => {
  try {
    // Path-based: /payment/WL-12345
    const m = (window.location.pathname || '').match(/^\/payment\/([^/]+)/i);
    if (m && m[1]) return decodeURIComponent(m[1]).toUpperCase();
    // Query-based: ?ref=WL-12345
    const q = new URLSearchParams(window.location.search).get('ref');
    if (q) return q.toUpperCase();
  } catch {}
  return '';
};

const MFSCard = ({ mfs, selected, onClick, lang }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative rounded-2xl p-4 border text-left transition-all ${
      selected
        ? 'border-white/40 ring-2 ring-white/20'
        : 'border-white/10 hover:border-white/25 hover:bg-white/[0.03]'
    }`}
    style={{
      background: selected ? mfs.bgGradient : 'rgba(255,255,255,0.02)',
    }}
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="font-display font-extrabold text-[15px] text-white">{mfs.name}</div>
        <div className="text-[11px] text-white/65 mt-0.5">{mfs.type}</div>
      </div>
      {selected && <div className="text-white text-xl">✓</div>}
    </div>
  </button>
);

const CopyableNumber = ({ value, lang }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\D/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-3">
      <div className="flex-1 font-mono font-extrabold text-lg md:text-xl text-white tabular-nums tracking-wide">
        {value}
      </div>
      <button
        type="button"
        onClick={copy}
        className="text-[12px] font-extrabold px-3 py-1.5 rounded-md bg-white text-gray-900 hover:bg-white/90"
      >
        {copied ? t(lang, 'payCopied') : t(lang, 'payCopy')}
      </button>
    </div>
  );
};

const SuccessScreen = ({ refId, paymentId, lang, onTrack, onHome }) => (
  <section className="relative max-w-xl mx-auto px-5 md:px-8 py-12 md:py-16">
    <div className="rounded-3xl p-7 md:p-10 border border-emerald-400/30 bg-emerald-500/[0.08] text-center">
      <div className="text-5xl mb-3">✅</div>
      <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3">
        {t(lang, 'paySuccessTitle')}
      </h1>
      <p className="text-[14.5px] text-white/75 leading-relaxed mb-6">
        {t(lang, 'paySuccessMessage')}
      </p>
      <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4 mb-6 text-left">
        <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
          {t(lang, 'paySuccessRef')}
        </div>
        <div className="font-mono font-extrabold text-white text-xl mt-1">{refId}</div>
        {paymentId && (
          <div className="font-mono text-[11px] text-white/45 mt-2 truncate">{paymentId}</div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={onTrack} className="btn-primary text-[13px] font-extrabold px-5 py-2.5 rounded-xl">
          {lang === 'en' ? 'Track order' : 'অর্ডার ট্র্যাক করুন'}
        </button>
        <button
          onClick={onHome}
          className="text-[13px] font-extrabold px-5 py-2.5 rounded-xl border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white"
        >
          {lang === 'en' ? 'Go home' : 'হোম পেজ'}
        </button>
      </div>
    </div>
  </section>
);

export default function PaymentPage(props) {
  const { lang = 'bn', onHome, onTrack } = props;

  const [refId, setRefId] = useState(readRefFromUrl);
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState('');
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [mfsKey, setMfsKey] = useState('bkash');
  const [transactionId, setTransactionId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [amount, setAmount] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(null); // { refId, paymentId }

  const mfs = MFS_INFO[mfsKey];

  /* Auto-load order details if URL contained a ref */
  useEffect(() => {
    if (refId) loadOrder(refId);
    // eslint-disable-next-line
  }, []);

  const loadOrder = async (ref) => {
    const code = (ref || '').trim().toUpperCase();
    if (!code) return;
    setLoadingOrder(true);
    setOrderError('');
    try {
      const r = await fetch(`/api/track?ref=${encodeURIComponent(code)}`);
      if (!r.ok) {
        setOrder(null);
        setOrderError(t(lang, 'payOrderNotFound'));
        return;
      }
      const d = await r.json();
      if (d?.lead) {
        setOrder(d.lead);
        // Prefill helpful fields from the order
        if (d.lead.name && !customerName) setCustomerName(d.lead.name);
        const total = d.lead.pricing?.total;
        if (total && !amount) setAmount(String(total));
      } else {
        setOrder(null);
        setOrderError(t(lang, 'payOrderNotFound'));
      }
    } catch {
      setOrder(null);
      setOrderError(t(lang, 'payOrderNotFound'));
    } finally {
      setLoadingOrder(false);
    }
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    setSubmitError('');

    if (!refId.trim() || !transactionId.trim() || !senderPhone.trim() || !customerName.trim()) {
      setSubmitError(t(lang, 'payErrorRequired'));
      return;
    }
    if (!/^01[3-9]\d{8}$/.test(senderPhone.trim())) {
      setSubmitError(t(lang, 'payErrorPhone'));
      return;
    }
    if (transactionId.trim().length < 5) {
      setSubmitError(t(lang, 'payErrorTrxId'));
      return;
    }

    setSubmitting(true);
    try {
      const r = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refId: refId.trim().toUpperCase(),
          method: mfsKey,
          transactionId: transactionId.trim(),
          senderPhone: senderPhone.trim(),
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          amount: Number(amount) || null,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setSubmitError(d?.error || t(lang, 'payErrorServer'));
        return;
      }
      setSuccess({ refId: refId.trim().toUpperCase(), paymentId: d?.paymentId });
    } catch {
      setSubmitError(t(lang, 'payErrorServer'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <PageShell {...props} current="payment">
        <SuccessScreen
          refId={success.refId}
          paymentId={success.paymentId}
          lang={lang}
          onTrack={onTrack || onHome}
          onHome={onHome}
        />
      </PageShell>
    );
  }

  return (
    <PageShell {...props} current="payment">
      <section className="relative max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <div className="text-center mb-7">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
            {t(lang, 'payBadge')}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-4 leading-[1.15]">
            {t(lang, 'payTitle')}
          </h1>
          <p className="text-[14px] text-white/55 mt-2 max-w-lg mx-auto">
            {t(lang, 'paySubtitle')}
          </p>
        </div>

        {/* Order ID + load */}
        <div className="rounded-2xl p-4 md:p-5 border border-white/10 bg-white/[0.03] mb-4">
          <label className="block text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-2">
            {t(lang, 'payOrderIdLabel')}
          </label>
          <div className="flex gap-2">
            <input
              value={refId}
              onChange={(e) => setRefId(e.target.value.toUpperCase())}
              placeholder={t(lang, 'payOrderIdPlaceholder')}
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono font-bold outline-none focus:border-indigo-400"
              spellCheck="false"
              autoCapitalize="characters"
            />
            <button
              type="button"
              onClick={() => loadOrder(refId)}
              disabled={loadingOrder || !refId.trim()}
              className="text-[12.5px] font-extrabold px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white disabled:opacity-60"
            >
              {loadingOrder ? '…' : t(lang, 'payOrderLoad')}
            </button>
          </div>
          {orderError && (
            <div className="mt-2 text-[12.5px] text-rose-300">{orderError}</div>
          )}
          {order && (
            <div className="mt-3 rounded-xl bg-white/[0.03] p-3 border border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="text-[12.5px] text-white/75">
                <div>{order.name} · {order.type || '—'}</div>
                <div className="text-white/45 text-[11.5px]">{order.status || 'new'}</div>
              </div>
              {order.pricing?.total > 0 && (
                <div className="text-right">
                  <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
                    {t(lang, 'payAmountDue')}
                  </div>
                  <div className="font-display font-extrabold text-xl grad-text font-mono tabular-nums">
                    {formatBDT(order.pricing.total)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MFS selection */}
        <div className="mb-4">
          <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-2 px-1">
            {t(lang, 'payChooseMethod')}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {Object.values(MFS_INFO).map((m) => (
              <MFSCard
                key={m.key}
                mfs={m}
                selected={mfsKey === m.key}
                onClick={() => setMfsKey(m.key)}
                lang={lang}
              />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div
          className="rounded-2xl p-5 border border-white/10 mb-4"
          style={{ background: `${mfs.color}12` }}
        >
          <div className="text-[11px] font-extrabold tracking-wider uppercase mb-3" style={{ color: mfs.color }}>
            {mfs.name} · {t(lang, 'payInstructionsTitle')}
          </div>
          <ol className="text-[13px] text-white/85 space-y-1.5 leading-relaxed mb-4">
            <li>{t(lang, 'payInstructionStep1')}</li>
            <li>{t(lang, 'payInstructionStep2')}</li>
            <li>{t(lang, 'payInstructionStep3')}</li>
            <li>{t(lang, 'payInstructionStep4')}</li>
          </ol>
          <label className="block text-[10.5px] font-extrabold tracking-wider text-white/55 uppercase mb-1.5">
            {t(lang, 'payMerchantNumber')}
          </label>
          <CopyableNumber value={mfs.number} lang={lang} />
        </div>

        {/* Submission form */}
        <form onSubmit={submit} className="rounded-2xl p-5 border border-white/10 bg-white/[0.03] space-y-3">
          <div>
            <label className="block text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
              {t(lang, 'payTrxIdLabel')}
            </label>
            <input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
              placeholder={t(lang, 'payTrxIdPlaceholder')}
              spellCheck="false"
              autoCapitalize="characters"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono font-bold outline-none focus:border-indigo-400"
            />
            <div className="text-[11.5px] text-white/45 mt-1">{t(lang, 'payTrxIdHelp')}</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
                {t(lang, 'paySenderPhoneLabel')}
              </label>
              <input
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value.replace(/\D/g, ''))}
                placeholder={t(lang, 'paySenderPhonePlaceholder')}
                inputMode="numeric"
                maxLength={11}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
                {t(lang, 'payAmountInputLabel')}
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                inputMode="numeric"
                placeholder="0"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
                {t(lang, 'payCustomerNameLabel')}
              </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
                {t(lang, 'payCustomerEmailLabel')}
              </label>
              <input
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                type="email"
                placeholder={t(lang, 'payCustomerEmailPlaceholder')}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          {submitError && (
            <div className="rounded-xl p-3 border border-rose-400/30 bg-rose-500/10 text-rose-200 text-[13px]">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full font-extrabold py-3 rounded-xl disabled:opacity-60 text-[14px]"
          >
            {submitting ? t(lang, 'paySubmitting') : t(lang, 'paySubmit')}
          </button>
        </form>
      </section>
    </PageShell>
  );
}
