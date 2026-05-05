import { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import {
  getType,
  BASE_PRICES_BDT,
  SERVICE_DURATIONS,
  SERVICE_ADDONS,
  FIRST_ORDER_DISCOUNT_BDT,
  CONTACT_INFO,
  PRICING_FAQ,
  featurePrice,
  t,
  tr,
} from '../data/content.js';
import { formatBDT, validateBDPhone, validateEmail } from '../utils.js';
import { useToast } from '../components/Toast.jsx';
import logo from '../assets/logo.png';

const ACCENT = '#6366f1';

const LangToggle = ({ lang, onToggle }) => (
  <button
    onClick={onToggle}
    title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    className="shrink-0 inline-flex items-center gap-1 text-[11.5px] font-bold rounded-lg overflow-hidden border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/85"
  >
    <span className={`px-2 py-1.5 ${lang === 'bn' ? 'bg-white text-gray-900' : ''}`}>বাং</span>
    <span className={`px-2 py-1.5 ${lang === 'en' ? 'bg-white text-gray-900' : ''}`}>EN</span>
  </button>
);

const Nav = ({ onHome, onBackToConfig, onContact, lang, onToggleLang }) => (
  <nav
    className="sticky top-0 z-30 backdrop-blur-2xl border-b"
    style={{
      background:
        'linear-gradient(180deg, rgba(7,9,26,0.92) 0%, rgba(7,9,26,0.78) 100%)',
      borderColor: 'rgba(255,255,255,0.08)',
      boxShadow: '0 6px 28px -16px rgba(0,0,0,0.7)',
    }}
  >
    <div className="max-w-6xl mx-auto px-5 md:px-8 h-20 md:h-28 flex items-center justify-between">
      <button onClick={onHome} className="flex items-center gap-2.5">
        <img loading="lazy" decoding="async"
          src={logo}
          alt="Website Lagbo Logo"
          className="h-14 md:h-20 lg:h-24 w-auto object-contain"
          style={{ filter: `drop-shadow(0 6px 16px ${ACCENT}aa) drop-shadow(0 0 6px rgba(236,72,153,0.45))` }}
        />
      </button>
      <div className="flex items-center gap-3 md:gap-4 text-[13.5px] font-semibold text-white/70">
        <button onClick={onHome} className="hidden md:inline hover:text-white">{lang === 'en' ? 'Home' : 'হোম'}</button>
        <span className="hidden md:inline text-white px-2 py-1 rounded-md bg-white/10">{t(lang, 'navPricing')}</span>
        <button onClick={onContact} className="hidden md:inline hover:text-white">{t(lang, 'navContact')}</button>
        <LangToggle lang={lang} onToggle={onToggleLang} />
        <button onClick={onBackToConfig} className="btn-primary text-[13px] font-bold px-4 py-2 rounded-lg">
          {t(lang, 'pricingEditSelection')}
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ lang }) => (
  <section className="relative overflow-hidden">
    <div
      className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
      style={{ background: `radial-gradient(closest-side, ${ACCENT}, transparent)` }}
    />
    <div
      className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
      style={{ background: 'radial-gradient(closest-side, #ec4899, transparent)' }}
    />
    <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14 text-center">
      <div className="inline-flex items-center gap-2 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
        {t(lang, 'pricingHeroBadge')}
      </div>
      <h1 className="font-display text-2xl md:text-4xl font-extrabold leading-[1.15] mt-4 text-white">
        {t(lang, 'pricingHeroTitle')}
      </h1>
      <p className="text-[13.5px] md:text-[15px] text-white/65 mt-3 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
        {t(lang, 'pricingHeroSubtitle')}
      </p>
    </div>
  </section>
);

const StepHeader = ({ n, label, hint }) => (
  <div className="mb-4">
    <div className="flex items-center gap-3">
      <span
        className="w-8 h-8 rounded-lg grid place-items-center text-white font-display font-extrabold"
        style={{ background: `linear-gradient(135deg, ${ACCENT}, #ec4899)` }}
      >
        {n}
      </span>
      <h2 className="font-display text-lg md:text-xl font-extrabold text-white">{label}</h2>
    </div>
    {hint && <div className="text-[12px] text-white/55 mt-1.5 ml-11">{hint}</div>}
  </div>
);

/* ====== Selection summary card (read-only, links back to configurator) ====== */
const SelectionSummary = ({ type, features, accent, onEdit, lang }) => {
  const current = getType(type);
  const enabledExtras = current.extras.filter((e) => features[e.key]);
  return (
    <div
      className="rounded-2xl p-5 border border-white/10"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-start gap-4">
        <span
          className="w-12 h-12 rounded-xl grid place-items-center text-2xl shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))` }}
        >
          {current.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
            {t(lang, 'pricingChosen')}
          </div>
          <div className="font-display font-extrabold text-[17px] text-white mt-0.5">
            {tr(current, 'name', lang)}
          </div>
          <div className="text-[12px] text-white/55 mt-0.5">{tr(current, 'tagline', lang)}</div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {current.essentials.map((e) => (
              <span key={e.key} className="text-[10.5px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-200 border border-emerald-500/25">
                {tr(e, 'label', lang)}
              </span>
            ))}
            {enabledExtras.map((e) => (
              <span key={e.key} className="text-[10.5px] px-2 py-0.5 rounded bg-white/10 text-white/85 border border-white/15">
                {tr(e, 'title', lang)} <span className="text-emerald-300/85 font-bold">+{formatBDT(featurePrice(e.key))}</span>
              </span>
            ))}
            {enabledExtras.length === 0 && (
              <span className="text-[11px] text-white/45">{t(lang, 'pricingFeatureNone')}</span>
            )}
          </div>
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 text-[11.5px] font-bold px-3 py-1.5 rounded-lg border border-white/15 text-white/85 hover:bg-white/5"
        >
          {t(lang, 'pricingEditSelection')}
        </button>
      </div>
    </div>
  );
};

/* ====== Service duration picker ====== */
const DurationStep = ({ duration, setDuration, lang }) => (
  <div>
    <StepHeader
      n={lang === 'en' ? '2' : '২'}
      label={t(lang, 'pricingStepDuration')}
      hint={t(lang, 'pricingDurationHint')}
    />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      {SERVICE_DURATIONS.map((d) => {
        const active = duration === d.months;
        return (
          <button
            key={d.months}
            onClick={() => setDuration(d.months)}
            className={`relative rounded-xl p-3 border transition-all text-left ${
              active ? 'border-transparent' : 'border-white/10 hover:border-white/25 bg-white/[0.03]'
            }`}
            style={{
              background: active
                ? `linear-gradient(135deg, ${ACCENT}, color-mix(in srgb, ${ACCENT} 60%, #000))`
                : undefined,
              boxShadow: active ? `0 12px 28px -10px ${ACCENT}` : undefined,
            }}
          >
            {tr(d, 'badge', lang) && (
              <span className="absolute -top-2 right-2 text-[9.5px] font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-amber-400 text-gray-900">
                {tr(d, 'badge', lang)}
              </span>
            )}
            <div className={`font-display font-extrabold text-[16px] ${active ? 'text-white' : 'text-white'}`}>
              {tr(d, 'label', lang)}
            </div>
            <div className={`mt-1.5 font-mono tabular-nums font-extrabold text-[15px] ${active ? 'text-white' : 'text-emerald-300'}`}>
              {formatBDT(d.perMonth)}
              <span className={`text-[11px] font-normal ${active ? 'text-white/85' : 'text-white/55'}`}>
                {t(lang, 'pricingPerMonth')}
              </span>
            </div>
            <div className={`text-[11px] mt-1 ${active ? 'text-white/85' : 'text-white/45'}`}>
              {formatBDT(d.perMonth * d.months)} {t(lang, 'pricingForMonths')}
            </div>
            {active && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white grid place-items-center">
                <Icon name="check" className="w-2.5 h-2.5 text-gray-900" stroke={3.5} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

/* ====== Add-ons (domain, hosting, database, etc.) ====== */
const AddonStep = ({ addons, toggleAddon, durationMonths, lang }) => (
  <div>
    <StepHeader n={lang === 'en' ? '3' : '৩'} label={t(lang, 'pricingStepAddons')} />
    <div className="grid md:grid-cols-2 gap-2">
      {SERVICE_ADDONS.map((a) => {
        const on = !!addons[a.key];
        const titleKey = `pricingAddon${a.key.charAt(0).toUpperCase() + a.key.slice(1)}`;
        const descKey = `${titleKey}Desc`;
        const totalForAddon =
          (a.once || 0) + (a.scaleWithService ? (a.recurring || 0) * durationMonths : (a.recurring || 0));
        return (
          <button
            key={a.key}
            onClick={() => toggleAddon(a.key)}
            className={`text-left rounded-xl p-3 border transition-all flex items-start gap-3 ${
              on ? 'border-transparent' : 'border-white/10 hover:border-white/25 bg-white/[0.03]'
            }`}
            style={{
              background: on
                ? 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.04))'
                : undefined,
              borderColor: on ? 'rgba(99,102,241,0.4)' : undefined,
            }}
          >
            <span
              className={`shrink-0 w-9 h-9 rounded-lg grid place-items-center ${
                on ? 'bg-indigo-500/30 text-indigo-200' : 'bg-white/5 text-white/55'
              }`}
            >
              <Icon name={a.icon} className="w-4 h-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-[13px] ${on ? 'text-white' : 'text-white/85'} truncate`}>
                  {t(lang, titleKey)}
                </span>
                {on && <Icon name="check" className="w-3.5 h-3.5 text-indigo-300 shrink-0" stroke={3} />}
              </div>
              <div className="text-[11.5px] text-white/55 mt-0.5 line-clamp-2">{t(lang, descKey)}</div>
              <div className="text-[10.5px] text-white/45 mt-1 flex items-center gap-1.5">
                {a.once > 0 && (
                  <span>
                    {formatBDT(a.once)} <span className="text-white/35">{t(lang, 'pricingOneTime')}</span>
                  </span>
                )}
                {a.recurring > 0 && (
                  <span>
                    + {formatBDT(a.recurring)}
                    {t(lang, 'pricingPerMonth')}
                  </span>
                )}
              </div>
            </div>
            <div className={`text-[12px] font-extrabold whitespace-nowrap text-right ${on ? 'text-indigo-300' : 'text-white/70'}`}>
              + {formatBDT(totalForAddon)}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

/* ====== Live quote summary ====== */
const QuoteSummary = ({
  type, features, duration, addons, lang,
  baseSum, featureSum, oneTimeAddons, recurringAddonsTotal, serviceTotal, total,
}) => {
  const current = getType(type);
  const selectedExtras = current.extras.filter((f) => features[f.key]);
  const months = duration;
  return (
    <div className="rounded-2xl p-5 md:p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="text-[11px] font-extrabold tracking-wider text-white/50 uppercase">
        {t(lang, 'pricingChosen')}
      </div>
      <div className="flex items-center gap-2.5 mt-2">
        <span className="text-2xl">{current.emoji}</span>
        <div>
          <div className="font-display font-extrabold text-[16px] text-white">{tr(current, 'name', lang)}</div>
          <div className="text-[11.5px] text-white/55">
            {selectedExtras.length} {t(lang, 'pricingFeatureCount')} · {months} {lang === 'en' ? 'months' : 'মাস'}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
          {t(lang, 'pricingOneTimeBuild')}
        </div>
        <div className="space-y-1 text-[13px]">
          <div className="flex items-center justify-between text-white/75">
            <span>{t(lang, 'pricingBasePrice')}</span>
            <span className="font-mono tabular-nums">{formatBDT(baseSum)}</span>
          </div>
          <div className="flex items-center justify-between text-white/75">
            <span>{selectedExtras.length} {t(lang, 'pricingFeatureCount')}</span>
            <span className="font-mono tabular-nums">+ {formatBDT(featureSum)}</span>
          </div>
          <div className="flex items-center justify-between text-white/75">
            <span>{t(lang, 'pricingAddonCount')}</span>
            <span className="font-mono tabular-nums">+ {formatBDT(oneTimeAddons)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase mb-1.5">
          {t(lang, 'pricingServiceTotal')} ({months} {lang === 'en' ? 'mo' : 'মাস'})
        </div>
        <div className="space-y-1 text-[13px]">
          <div className="flex items-center justify-between text-white/75">
            <span>{t(lang, 'pricingRecurring')}</span>
            <span className="font-mono tabular-nums">{formatBDT(serviceTotal)}</span>
          </div>
          {recurringAddonsTotal > 0 && (
            <div className="flex items-center justify-between text-white/75">
              <span>{lang === 'en' ? 'Hosting / DB / Analytics' : 'হোস্টিং / ডিবি / অ্যানালিটিক্স'}</span>
              <span className="font-mono tabular-nums">+ {formatBDT(recurringAddonsTotal)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline justify-between">
        <span className="font-bold text-white text-[15px]">{t(lang, 'pricingFinalTotal')}</span>
        <span className="font-display font-extrabold text-2xl md:text-3xl grad-text font-mono tabular-nums">
          {formatBDT(total)}
        </span>
      </div>
      <div className="text-[11px] text-white/45 mt-1.5 leading-snug">{t(lang, 'pricingNote')}</div>
      <div className="text-[11px] text-emerald-400/85 mt-1">{t(lang, 'pricingDeliveryNote')}</div>
    </div>
  );
};

const SubmitForm = ({ form, setForm, onSubmit, sending, lang, total, errors = {} }) => {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const fieldClass = (key) =>
    `w-full text-[13px] px-3 py-2.5 rounded-lg border bg-white/[0.04] text-white outline-none focus:border-white/40 ${
      errors[key] ? 'border-rose-400/60' : 'border-white/10'
    }`;
  const errLine = (key) =>
    errors[key] ? <span className="block text-[11px] text-rose-300 mt-1">{errors[key]}</span> : null;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="rounded-2xl p-5 md:p-6 border border-white/10 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div>
        <div className="font-display text-lg md:text-xl font-extrabold text-white">{t(lang, 'pricingFormTitle')}</div>
        <div className="text-[12.5px] text-white/55 mt-0.5">{t(lang, 'pricingFormSubtitle')}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'pricingFormName')} *</span>
          <input value={form.name} onChange={set('name')} className={fieldClass('name')} />
          {errLine('name')}
        </label>
        <label className="block">
          <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'pricingFormPhone')} *</span>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            value={form.phone}
            onChange={set('phone')}
            className={fieldClass('phone')}
          />
          {errLine('phone')}
        </label>
        <label className="block">
          <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'pricingFormBusiness')}</span>
          <input value={form.business} onChange={set('business')} className={fieldClass('business')} />
          {errLine('business')}
        </label>
        <label className="block">
          <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'pricingFormEmail')}</span>
          <input type="email" value={form.email} onChange={set('email')} className={fieldClass('email')} />
          {errLine('email')}
        </label>
      </div>
      <label className="block">
        <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'pricingFormNote')}</span>
        <textarea
          rows={3}
          placeholder={t(lang, 'pricingFormNotePh')}
          value={form.note}
          onChange={set('note')}
          className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-white outline-none focus:border-white/40 resize-none"
        />
      </label>

      <div className="flex items-center justify-between text-[13px] pt-2 border-t border-white/10">
        <span className="text-white/65">{t(lang, 'pricingFinalTotal')}</span>
        <span className="font-display font-extrabold text-xl grad-text font-mono tabular-nums">{formatBDT(total)}</span>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full btn-primary text-[14px] font-extrabold py-3 rounded-xl disabled:opacity-60"
      >
        {sending ? t(lang, 'pricingOrderCTASending') : t(lang, 'pricingOrderCTA')}
      </button>
    </form>
  );
};

/* ============== FAQ SECTION ============== */
const FAQItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 md:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-white/[0.04] transition-colors"
      >
        <span className="font-bold text-white text-[13.5px] md:text-[14.5px]">{q}</span>
        <span className={`shrink-0 text-white/55 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-4 md:px-5 pb-4 text-[13px] md:text-[14px] text-white/65 leading-relaxed border-t border-white/5">
          {a}
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ lang }) => (
  <section className="max-w-4xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
    <div className="text-center mb-8 md:mb-10">
      <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
        {t(lang, 'pricingFAQBadge')}
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mt-3">
        {t(lang, 'pricingFAQHeading')}
      </h2>
    </div>
    <div className="space-y-2.5">
      {PRICING_FAQ.map((item, i) => (
        <FAQItem
          key={i}
          q={tr(item, 'q', lang)}
          a={tr(item, 'a', lang)}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  </section>
);

const ThanksScreen = ({ refId, total, onHome, onAnother, lang }) => (
  <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-20">
    <div className="rounded-3xl p-8 md:p-12 text-center border border-emerald-500/30" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.02))' }}>
      <div className="text-5xl md:text-6xl">🎉</div>
      <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-4">
        {t(lang, 'pricingThanksTitle')}
      </h1>
      <p className="text-[14px] md:text-[16px] text-white/70 mt-3 max-w-lg mx-auto">
        {t(lang, 'pricingThanksDesc')}
      </p>
      <div className="mt-5 inline-flex items-center gap-3 flex-wrap justify-center">
        <span className="px-4 py-2 rounded-lg bg-white/10 text-white/85 text-[13px]">
          {t(lang, 'pricingThanksRefId')}: <span className="font-mono font-bold">{refId}</span>
        </span>
        <span className="px-4 py-2 rounded-lg bg-emerald-500/15 text-emerald-200 text-[13px]">
          {t(lang, 'pricingFinalTotal')}: <span className="font-mono font-bold">{formatBDT(total)}</span>
        </span>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={onAnother} className="btn-primary text-[13px] font-bold px-5 py-2.5 rounded-lg">
          {t(lang, 'pricingThanksAnother')}
        </button>
        <button onClick={onHome} className="text-[13px] font-bold px-5 py-2.5 rounded-lg border border-white/15 text-white/85 hover:bg-white/5">
          {t(lang, 'pricingThanksHome')}
        </button>
      </div>
    </div>
  </div>
);

export default function PricingPage({
  onHome,
  onBackToConfig,
  onContact,
  selectedType = 'landing',
  selectedFeatures = {},
  accent = ACCENT,
  lang = 'bn',
  onToggleLang,
}) {
  const [duration, setDuration] = useState(12);
  const [addons, setAddons] = useState({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', note: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  const toggleAddon = (key) => setAddons((s) => ({ ...s, [key]: !s[key] }));

  const { baseSum, featureSum, oneTimeAddons, recurringAddonsTotal, serviceTotal, total } = useMemo(() => {
    const cur = getType(selectedType);
    const baseSum = BASE_PRICES_BDT[selectedType] ?? 5000;
    const featureSum = cur.extras
      .filter((e) => selectedFeatures[e.key])
      .reduce((s, e) => s + featurePrice(e.key), 0);

    const dur = SERVICE_DURATIONS.find((d) => d.months === duration) || SERVICE_DURATIONS[3];
    const serviceTotal = dur.perMonth * dur.months;

    let oneTime = 0;
    let recurring = 0;
    SERVICE_ADDONS.forEach((a) => {
      if (!addons[a.key]) return;
      oneTime += a.once || 0;
      if (a.recurring) {
        recurring += a.scaleWithService ? a.recurring * duration : a.recurring;
      }
    });

    return {
      baseSum,
      featureSum,
      oneTimeAddons: oneTime,
      recurringAddonsTotal: recurring,
      serviceTotal,
      total: baseSum + featureSum + oneTime + recurring + serviceTotal,
    };
  }, [selectedType, selectedFeatures, duration, addons]);

  const submit = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t(lang, 'validRequired');
    if (!form.phone.trim()) errs.phone = t(lang, 'validRequired');
    else if (!validateBDPhone(form.phone)) errs.phone = t(lang, 'validPhoneBD');
    if (form.email && !validateEmail(form.email)) errs.email = t(lang, 'validEmail');
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(t(lang, 'toastFormError'));
      return;
    }
    setSending(true);
    const refId = 'WL-' + Math.floor(10000 + Math.random() * 89999);
    const cur = getType(selectedType);
    const lead = {
      refId,
      submittedAt: new Date().toISOString(),
      lang,
      type: selectedType,
      features: cur.extras.filter((e) => selectedFeatures[e.key]).map((e) => e.key),
      duration,
      addons: SERVICE_ADDONS.filter((a) => addons[a.key]).map((a) => a.key),
      pricing: { baseSum, featureSum, oneTimeAddons, recurringAddonsTotal, serviceTotal, total },
      ...form,
    };
    try {
      const existing = JSON.parse(localStorage.getItem('wl_pricing_leads') || '[]');
      existing.push(lead);
      localStorage.setItem('wl_pricing_leads', JSON.stringify(existing));
    } catch {}
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
      .catch(() => {})
      .finally(() => {
        setSending(false);
        setSubmitted({ refId, total });
        toast.success(t(lang, 'toastQuoteSent'));
      });
  };

  const reset = () => {
    setSubmitted(null);
    setForm({ name: '', phone: '', email: '', business: '', note: '' });
    setAddons({});
    setDuration(12);
  };

  return (
    <div className="absolute inset-0 overflow-y-auto nice-scroll">
      <Nav onHome={onHome} onBackToConfig={onBackToConfig} onContact={onContact} lang={lang} onToggleLang={onToggleLang} />

      {submitted ? (
        <ThanksScreen
          refId={submitted.refId}
          total={submitted.total}
          onHome={onHome}
          onAnother={reset}
          lang={lang}
        />
      ) : (
        <>
          <Hero lang={lang} />

          <div className="max-w-6xl mx-auto px-5 md:px-8 pb-20">
            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              <div className="space-y-8">
                <div>
                  <StepHeader n={lang === 'en' ? '1' : '১'} label={t(lang, 'pricingStepType')} />
                  <SelectionSummary
                    type={selectedType}
                    features={selectedFeatures}
                    accent={accent}
                    onEdit={onBackToConfig}
                    lang={lang}
                  />
                </div>
                <DurationStep duration={duration} setDuration={setDuration} lang={lang} />
                <AddonStep addons={addons} toggleAddon={toggleAddon} durationMonths={duration} lang={lang} />
                <div>
                  <StepHeader n={lang === 'en' ? '4' : '৪'} label={t(lang, 'pricingStepSubmit')} />
                  <SubmitForm form={form} setForm={setForm} onSubmit={submit} sending={sending} lang={lang} total={total} errors={formErrors} />
                </div>
              </div>

              <aside className="lg:sticky lg:top-20 self-start space-y-4">
                <QuoteSummary
                  type={selectedType}
                  features={selectedFeatures}
                  duration={duration}
                  addons={addons}
                  lang={lang}
                  baseSum={baseSum}
                  featureSum={featureSum}
                  oneTimeAddons={oneTimeAddons}
                  recurringAddonsTotal={recurringAddonsTotal}
                  serviceTotal={serviceTotal}
                  total={total}
                />
                <div className="rounded-2xl p-4 border border-white/10 bg-white/[0.03] text-[12.5px] text-white/65">
                  <div className="font-bold text-white mb-2">{t(lang, 'navContact')}</div>
                  <div className="flex items-center gap-2"><Icon name="phone" className="w-3.5 h-3.5" /> {CONTACT_INFO.phoneDisplay}</div>
                  <div className="flex items-center gap-2 mt-1"><Icon name="mail" className="w-3.5 h-3.5" /> {CONTACT_INFO.email}</div>
                </div>
              </aside>
            </div>
          </div>

          <FAQSection lang={lang} />
        </>
      )}
    </div>
  );
}
