import { useState } from 'react';
import PageShell from './PageShell.jsx';
import { t } from '../data/content.js';
import { formatBDT } from '../utils.js';

const ACCENT = '#6366f1';

/* Map elapsed-time-since-submission to a step (0..4). Demo logic until
   we have a real DB of order statuses — pulls leads from localStorage. */
const STEP_THRESHOLDS_HOURS = [0, 1, 4, 24, 48]; // step 0,1,2,3,4 from order time
const computeStep = (submittedAtISO) => {
  if (!submittedAtISO) return 0;
  const ms = Date.now() - new Date(submittedAtISO).getTime();
  const hours = ms / (1000 * 60 * 60);
  let step = 0;
  for (let i = 0; i < STEP_THRESHOLDS_HOURS.length; i++) {
    if (hours >= STEP_THRESHOLDS_HOURS[i]) step = i;
  }
  return step;
};

const findLead = (refId) => {
  try {
    const leads = JSON.parse(localStorage.getItem('wl_pricing_leads') || '[]');
    return leads.find((l) => (l.refId || '').toLowerCase() === refId.toLowerCase()) || null;
  } catch {
    return null;
  }
};

const StepRow = ({ icon, title, desc, state }) => {
  // state: 'done' | 'active' | 'pending'
  const colors = {
    done: { bg: '#10b981', ring: 'rgba(16,185,129,0.3)', text: 'text-emerald-300' },
    active: { bg: ACCENT, ring: `${ACCENT}55`, text: 'text-white' },
    pending: { bg: 'rgba(255,255,255,0.08)', ring: 'rgba(255,255,255,0.04)', text: 'text-white/40' },
  }[state];
  return (
    <div className="flex items-start gap-3.5 md:gap-4">
      <div className="flex flex-col items-center shrink-0">
        <span
          className={`w-9 h-9 rounded-full grid place-items-center text-white text-sm font-bold ${
            state === 'active' ? 'pulse-ring' : ''
          }`}
          style={{ background: colors.bg, boxShadow: `0 0 0 6px ${colors.ring}` }}
        >
          {state === 'done' ? '✓' : icon}
        </span>
        <div className="w-px flex-1 mt-2" style={{ background: state === 'pending' ? 'rgba(255,255,255,0.08)' : ACCENT }} />
      </div>
      <div className={`pb-8 ${colors.text}`}>
        <div className="font-display font-extrabold text-[15px] md:text-[16px] leading-tight">{title}</div>
        <div className="text-[12.5px] md:text-[13.5px] text-white/55 mt-1 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
};

const Result = ({ lead, lang }) => {
  const step = computeStep(lead.submittedAt);
  const total = lead?.pricing?.total || 0;
  const submitted = new Date(lead.submittedAt).toLocaleString(lang === 'en' ? 'en-US' : 'en-IN');
  const eta = new Date(new Date(lead.submittedAt).getTime() + 48 * 60 * 60 * 1000).toLocaleString(lang === 'en' ? 'en-US' : 'en-IN');

  const steps = [
    { icon: '①', t: t(lang, 'trackStep1'), d: t(lang, 'trackStep1Desc') },
    { icon: '②', t: t(lang, 'trackStep2'), d: t(lang, 'trackStep2Desc') },
    { icon: '③', t: t(lang, 'trackStep3'), d: t(lang, 'trackStep3Desc') },
    { icon: '④', t: t(lang, 'trackStep4'), d: t(lang, 'trackStep4Desc') },
    { icon: '⑤', t: t(lang, 'trackStep5'), d: t(lang, 'trackStep5Desc') },
  ];

  return (
    <div className="rounded-2xl p-5 md:p-7 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="flex flex-wrap items-end justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
            {t(lang, 'trackOrderId')}
          </div>
          <div className="font-display font-extrabold text-2xl md:text-3xl text-white font-mono">
            {lead.refId}
          </div>
        </div>
        {total > 0 && (
          <div className="text-right">
            <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
              {t(lang, 'pricingFinalTotal')}
            </div>
            <div className="font-display font-extrabold text-xl md:text-2xl grad-text font-mono tabular-nums">
              {formatBDT(total)}
            </div>
          </div>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-6 text-[12.5px]">
        <div className="rounded-lg p-3 border border-white/10 bg-white/[0.02]">
          <div className="text-[10.5px] font-bold text-white/45 uppercase tracking-wider">{t(lang, 'trackSubmitted')}</div>
          <div className="text-white mt-1">{submitted}</div>
        </div>
        <div className="rounded-lg p-3 border border-white/10 bg-white/[0.02]">
          <div className="text-[10.5px] font-bold text-white/45 uppercase tracking-wider">{t(lang, 'trackEstimated')}</div>
          <div className="text-white mt-1">{eta}</div>
        </div>
      </div>
      <div className="relative">
        {steps.map((s, i) => (
          <StepRow
            key={i}
            icon={s.icon}
            title={s.t}
            desc={s.d}
            state={i < step ? 'done' : i === step ? 'active' : 'pending'}
          />
        ))}
      </div>
    </div>
  );
};

export default function TrackPage(props) {
  const { lang = 'bn' } = props;
  const [refId, setRefId] = useState('');
  const [searching, setSearching] = useState(false);
  const [lead, setLead] = useState(null);
  const [error, setError] = useState('');

  const submit = (e) => {
    e?.preventDefault?.();
    if (!refId.trim()) return;
    setSearching(true);
    setError('');
    setTimeout(() => {
      const found = findLead(refId.trim());
      if (found) {
        setLead(found);
      } else {
        setError(t(lang, 'trackNotFound'));
        setLead(null);
      }
      setSearching(false);
    }, 400);
  };

  return (
    <PageShell {...props} current="track">
      <section className="relative max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'trackBadge')}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-4 leading-[1.15]">
            {t(lang, 'trackTitle')}
          </h1>
          <p className="text-[14px] md:text-[16px] text-white/55 mt-3 max-w-xl mx-auto">
            {t(lang, 'trackSubtitle')}
          </p>
        </div>

        <form onSubmit={submit} className="rounded-2xl p-3 md:p-3.5 border border-white/10 bg-white/[0.04] flex items-center gap-2 mb-3">
          <input
            value={refId}
            onChange={(e) => setRefId(e.target.value.toUpperCase())}
            placeholder={t(lang, 'trackPlaceholder')}
            className="flex-1 bg-transparent outline-none px-3 py-2 text-[15px] font-mono font-bold text-white placeholder:text-white/35 tracking-wider"
            spellCheck="false"
            autoCapitalize="characters"
          />
          <button
            type="submit"
            disabled={searching || !refId.trim()}
            className="btn-primary text-[13px] font-extrabold px-4 md:px-5 py-2.5 rounded-xl whitespace-nowrap disabled:opacity-60"
          >
            {searching ? t(lang, 'trackChecking') : t(lang, 'trackButton')}
          </button>
        </form>

        {error && (
          <div className="rounded-xl p-4 border border-rose-400/30 bg-rose-500/10 text-rose-200 text-[13px] mb-6">
            {error}
          </div>
        )}

        {lead && <Result lead={lead} lang={lang} />}
      </section>
    </PageShell>
  );
}
