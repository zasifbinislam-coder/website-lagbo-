import { useEffect } from 'react';
import Icon from '../components/Icon.jsx';
import { SITE_TYPES, TESTIMONIALS, CONTACT_INFO, HOMEPAGE_COMPARISON, t, tr } from '../data/content.js';
import logo from '../assets/logo.png';

const ACCENT = '#6366f1';

const HomeWhatsAppFAB = ({ lang }) => {
  const msg = encodeURIComponent(
    lang === 'en'
      ? 'Hi! I want to talk about a new website.'
      : 'হ্যালো! আমি একটা নতুন ওয়েবসাইট সম্পর্কে কথা বলতে চাই।'
  );
  const href = `https://wa.me/88${CONTACT_INFO.whatsapp}?text=${msg}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 group"
    >
      <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-[12px] font-bold px-3 py-1.5 rounded-md bg-white text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {lang === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে কথা বলুন'}
      </span>
      <span
        className="relative grid place-items-center w-12 h-12 rounded-full text-white shadow-xl pulse-ring"
        style={{ background: '#22c55e' }}
      >
        <Icon name="whatsapp" className="w-6 h-6" />
      </span>
    </a>
  );
};

/* ============== LANGUAGE TOGGLE ============== */
const LangToggle = ({ lang, onToggle, variant = 'dark' }) => {
  const dark = variant === 'dark';
  return (
    <button
      onClick={onToggle}
      title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
      className={`shrink-0 inline-flex items-center gap-1 text-[11.5px] font-bold rounded-lg overflow-hidden border transition-colors ${
        dark
          ? 'border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/85'
          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
      }`}
    >
      <span
        className={`px-2 py-1.5 ${
          lang === 'bn'
            ? dark
              ? 'bg-white text-gray-900'
              : 'bg-gray-900 text-white'
            : ''
        }`}
      >
        বাং
      </span>
      <span
        className={`px-2 py-1.5 ${
          lang === 'en'
            ? dark
              ? 'bg-white text-gray-900'
              : 'bg-gray-900 text-white'
            : ''
        }`}
      >
        EN
      </span>
    </button>
  );
};

/* ============== NAVBAR ============== */
const Nav = ({ onStart, onPricing, onContact, onAbout, onBlog, lang, onToggleLang }) => (
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
      <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center">
        <img loading="lazy" decoding="async"
          src={logo}
          alt="Website Lagbo Logo"
          className="h-14 md:h-20 lg:h-24 w-auto object-contain"
          style={{ filter: `drop-shadow(0 6px 16px ${ACCENT}aa) drop-shadow(0 0 6px rgba(236,72,153,0.45))` }}
        />
      </a>
      <div className="flex items-center gap-3 md:gap-4 text-[13.5px] font-semibold text-white/70">
        <button onClick={onAbout} className="hidden md:inline hover:text-white">{t(lang, 'navAbout')}</button>
        <button onClick={onPricing} className="hidden md:inline hover:text-white">{t(lang, 'navPricing')}</button>
        <button onClick={onBlog} className="hidden md:inline hover:text-white">{t(lang, 'navBlog')}</button>
        <button onClick={onContact} className="hidden md:inline hover:text-white">{t(lang, 'navContact')}</button>
        <LangToggle lang={lang} onToggle={onToggleLang} />
        <button
          onClick={onStart}
          className="btn-primary text-[13px] font-bold px-4 py-2 rounded-lg"
        >
          {t(lang, 'navFreeDemo')}
        </button>
      </div>
    </div>
  </nav>
);

/* ============== HERO ============== */
const Hero = ({ onStart, lang }) => (
  <section className="relative overflow-hidden">
    <div
      className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
      style={{ background: `radial-gradient(closest-side, ${ACCENT}, transparent)` }}
    />
    <div
      className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
      style={{ background: 'radial-gradient(closest-side, #ec4899, transparent)' }}
    />

    <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20 text-center">
      <div className="inline-flex items-center gap-2 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
        {t(lang, 'heroBadge')}
      </div>

      <h1 className="font-display text-3xl md:text-6xl font-extrabold leading-[1.1] mt-5">
        <span className="text-white">{t(lang, 'heroTitle1')}</span>
        <br />
        <span className="grad-text">{t(lang, 'heroTitle2')}</span>
      </h1>

      <p className="text-[14px] md:text-[18px] text-white/65 mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
        {t(lang, 'heroSubtitle')}
      </p>

      <div className="flex flex-col items-center mt-8 md:mt-10">
        <button
          onClick={onStart}
          className="group relative text-[15px] md:text-[18px] font-extrabold px-7 md:px-10 py-4 md:py-5 rounded-2xl text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #ec4899)`,
            boxShadow: `0 24px 48px -16px ${ACCENT}aa`,
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            {t(lang, 'heroCTA')}
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #ec4899, #f59e0b)' }}
          />
        </button>
        <div className="text-[12px] text-white/45 mt-3 flex items-center gap-2">
          <Icon name="check" className="w-3.5 h-3.5 text-emerald-400" stroke={3} />
          {t(lang, 'heroNote')}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-6 mt-10 md:mt-14 max-w-2xl mx-auto">
        {[
          { v: t(lang, 'stat1'), l: t(lang, 'statSiteTypes') },
          { v: t(lang, 'stat2'), l: t(lang, 'statFeatures') },
          { v: t(lang, 'stat3'), l: t(lang, 'statDelivery') },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl p-3 md:p-4 border border-white/10 backdrop-blur"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="font-display text-xl md:text-3xl font-extrabold grad-text">{s.v}</div>
            <div className="text-[11px] md:text-[13px] text-white/55 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============== TRUST BAR (Empire Flippers-style trust strip) ============== */
const TrustBar = ({ lang }) => (
  <section className="relative px-5 md:px-8 -mt-2 md:-mt-4">
    <div className="max-w-6xl mx-auto rounded-2xl px-4 md:px-6 py-3.5 border border-white/10 backdrop-blur-xl"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <div className="flex flex-wrap items-center justify-around gap-x-6 gap-y-2 text-[12.5px] md:text-[13.5px] font-bold text-white/80">
        <span className="inline-flex items-center gap-1.5">{t(lang, 'trustRatingLabel')}</span>
        <span className="hidden md:inline w-px h-4 bg-white/15" />
        <span className="inline-flex items-center gap-1.5">{t(lang, 'trustDelivery')}</span>
        <span className="hidden md:inline w-px h-4 bg-white/15" />
        <span className="inline-flex items-center gap-1.5">{t(lang, 'trustCOD')}</span>
        <span className="hidden md:inline w-px h-4 bg-white/15" />
        <span className="inline-flex items-center gap-1.5">{t(lang, 'trustSupport')}</span>
      </div>
    </div>
  </section>
);

/* ============== STATS COUNTERS ============== */
const StatsCounter = ({ lang }) => {
  const items = [
    { big: t(lang, 'stat1Big'), label: t(lang, 'stat1Label'), color: '#6366f1' },
    { big: t(lang, 'stat2Big'), label: t(lang, 'stat2Label'), color: '#ec4899' },
    { big: t(lang, 'stat3Big'), label: t(lang, 'stat3Label'), color: '#10b981' },
    { big: t(lang, 'stat4Big'), label: t(lang, 'stat4Label'), color: '#f59e0b' },
  ];
  return (
    <section className="relative py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'statsBadge')}
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
            {t(lang, 'statsHeading')}
          </h2>
          <p className="text-[14px] md:text-[16px] text-white/55 mt-2 max-w-2xl mx-auto">
            {t(lang, 'statsSubheading')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {items.map((s) => (
            <div
              key={s.label}
              className="relative rounded-2xl p-5 md:p-6 border border-white/10 backdrop-blur lift-on-hover"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
              />
              <div
                className="font-display text-3xl md:text-5xl font-extrabold leading-none tabular-nums"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, color-mix(in srgb, ${s.color} 60%, white))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {s.big}
              </div>
              <div className="text-[12.5px] md:text-[14px] text-white/65 mt-2 font-medium leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============== FEATURED EXAMPLES (marketplace-style cards) ============== */
const FeaturedExamples = ({ onStart, lang }) => {
  const picks = SITE_TYPES.slice(0, 6);
  return (
    <section className="relative py-14 md:py-20 px-5 md:px-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-10">
          <div>
            <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
              {t(lang, 'examplesBadge')}
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
              {t(lang, 'examplesHeading')}
            </h2>
            <p className="text-[13.5px] md:text-[15px] text-white/55 mt-2">
              {t(lang, 'examplesSubheading')}
            </p>
          </div>
          <button
            onClick={onStart}
            className="hidden md:inline shrink-0 text-[13px] font-bold text-white/85 hover:text-white"
          >
            {t(lang, 'examplesViewAll')}
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {picks.map((p) => (
            <button
              key={p.key}
              onClick={onStart}
              className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="relative h-40 md:h-44">
                <img loading="lazy" decoding="async"
                  src={p.sample}
                  alt={tr(p, 'name', lang)}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, ${p.accent}cc)`,
                  }}
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10.5px] font-extrabold tracking-wider px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t(lang, 'examplesStatusLive')}
                </span>
                <span className="absolute top-3 right-3 text-2xl">{p.emoji}</span>
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display font-extrabold text-white text-[15px] truncate">
                    {tr(p, 'name', lang)}
                  </div>
                  <span className="text-[11px] font-bold text-white/55 group-hover:text-white transition-colors">
                    {t(lang, 'examplesViewSite')} →
                  </span>
                </div>
                <div className="text-[12.5px] text-white/55 mt-1 line-clamp-1">
                  {tr(p, 'tagline', lang)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============== COMPARISON TABLE (us vs Wix vs custom dev) ============== */
const ComparisonCell = ({ value }) => {
  if (value === true) return <span className="text-emerald-300 text-lg" title="Yes">✓</span>;
  if (value === false) return <span className="text-rose-400/70 text-lg" title="No">✕</span>;
  if (value === 'partial') return <span className="text-amber-300 text-sm">partial</span>;
  return null;
};

const ComparisonTable = ({ lang }) => (
  <section className="relative py-16 md:py-20 px-5 md:px-8">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
          {t(lang, 'comparisonHomeBadge')}
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
          {t(lang, 'comparisonHomeHeading')}
        </h2>
        <p className="text-[14px] md:text-[16px] text-white/55 mt-2">
          {t(lang, 'comparisonHomeSubheading')}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <table className="w-full text-[13px] md:text-[14px] text-left min-w-[520px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 md:px-6 py-4 font-bold text-white/55 text-[11px] uppercase tracking-wider">Feature</th>
              <th className="px-3 md:px-4 py-4 text-center">
                <div className="font-display font-extrabold text-white text-[14px]">{t(lang, 'comparisonColUs')}</div>
                <div className="text-[10.5px] text-emerald-400 mt-0.5">⭐ Recommended</div>
              </th>
              <th className="px-3 md:px-4 py-4 text-center">
                <div className="font-display font-bold text-white/65 text-[14px]">{t(lang, 'comparisonColWix')}</div>
              </th>
              <th className="px-3 md:px-4 py-4 text-center">
                <div className="font-display font-bold text-white/65 text-[14px]">{t(lang, 'comparisonColCustom')}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {HOMEPAGE_COMPARISON.map((row, i) => (
              <tr
                key={row.keyName}
                className={`${i % 2 === 0 ? 'bg-white/[0.02]' : ''} border-b border-white/5 last:border-0`}
              >
                <td className="px-4 md:px-6 py-3.5 text-white/80">{t(lang, row.keyName)}</td>
                <td className="px-3 md:px-4 py-3.5 text-center bg-emerald-500/[0.06]">
                  <ComparisonCell value={row.us} />
                </td>
                <td className="px-3 md:px-4 py-3.5 text-center"><ComparisonCell value={row.wix} /></td>
                <td className="px-3 md:px-4 py-3.5 text-center"><ComparisonCell value={row.custom} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

/* ============== PRESS / MEDIA FEATURES ============== */
const PressFeatures = ({ lang }) => {
  const outlets = [
    'The Daily Star',
    'Prothom Alo',
    'BD News 24',
    'Dhaka Tribune',
    'Bonik Barta',
    'Tech Shohor',
  ];
  return (
    <section className="relative py-12 md:py-16 px-5 md:px-8 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'pressBadge')}
          </div>
          <h2 className="font-display text-xl md:text-3xl font-extrabold text-white/90 mt-3">
            {t(lang, 'pressHeading')}
          </h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-5 items-center">
          {outlets.map((name) => (
            <div
              key={name}
              className="text-center font-display font-extrabold text-[13px] md:text-[15px] text-white/35 hover:text-white/70 transition-colors tracking-wide truncate"
              title={name}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============== HOW IT WORKS ============== */
const HowItWorks = ({ lang }) => {
  const steps = [
    {
      n: lang === 'en' ? '1' : '১',
      icon: 'grid',
      color: '#6366f1',
      title: t(lang, 'step1Title'),
      desc: t(lang, 'step1Desc'),
    },
    {
      n: lang === 'en' ? '2' : '২',
      icon: 'sparkles',
      color: '#ec4899',
      title: t(lang, 'step2Title'),
      desc: t(lang, 'step2Desc'),
    },
    {
      n: lang === 'en' ? '3' : '৩',
      icon: 'check',
      color: '#10b981',
      title: t(lang, 'step3Title'),
      desc: t(lang, 'step3Desc'),
    },
  ];
  return (
    <section id="how" className="relative py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'howBadge')}
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
            {t(lang, 'howTitle')}
          </h2>
          <p className="text-[14px] md:text-[16px] text-white/55 mt-2">
            {t(lang, 'howSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl p-6 border border-white/10 backdrop-blur hover:border-white/20 transition-all"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div
                className="absolute -top-4 left-6 w-10 h-10 rounded-xl grid place-items-center font-display font-extrabold text-white text-lg"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, color-mix(in srgb, ${s.color} 60%, #000))`,
                  boxShadow: `0 8px 20px -8px ${s.color}`,
                }}
              >
                {s.n}
              </div>
              <div
                className="w-12 h-12 rounded-xl grid place-items-center mt-4"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                <Icon name={s.icon} className="w-6 h-6" stroke={2} />
              </div>
              <div className="font-display text-xl font-extrabold text-white mt-4">{s.title}</div>
              <div className="text-[14px] text-white/65 mt-2 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============== SITE TYPES SHOWCASE ============== */
const SiteTypesShowcase = ({ onStart, lang }) => (
  <section id="types" className="relative py-16 md:py-24 px-5 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10 md:mb-14">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
          {t(lang, 'typesBadge')}
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
          {t(lang, 'typesTitle')}
        </h2>
        <p className="text-[14px] md:text-[16px] text-white/55 mt-2">
          {t(lang, 'typesSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {SITE_TYPES.map((t2) => (
          <button
            key={t2.key}
            onClick={onStart}
            className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="relative h-24">
              <img loading="lazy" decoding="async"
                src={t2.sample}
                alt={tr(t2, 'name', lang)}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 30%, ${t2.accent}cc)`,
                }}
              />
              <span className="absolute top-2 left-2 text-2xl">{t2.emoji}</span>
            </div>
            <div className="p-3">
              <div className="font-bold text-white text-[13px]">{tr(t2, 'name', lang)}</div>
              <div className="text-[11px] text-white/55 mt-0.5 leading-tight">{tr(t2, 'tagline', lang)}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onStart}
          className="btn-primary text-[14px] font-extrabold px-6 py-3 rounded-xl"
        >
          {t(lang, 'typesCTA')}
        </button>
      </div>
    </div>
  </section>
);

/* ============== WHY US ============== */
const WhyUs = ({ lang }) => {
  const items = [
    { icon: '⚡', title: t(lang, 'why1Title'), desc: t(lang, 'why1Desc') },
    { icon: '💰', title: t(lang, 'why2Title'), desc: t(lang, 'why2Desc') },
    { icon: '🇧🇩', title: t(lang, 'why3Title'), desc: t(lang, 'why3Desc') },
    { icon: '💳', title: t(lang, 'why4Title'), desc: t(lang, 'why4Desc') },
    { icon: '🔧', title: t(lang, 'why5Title'), desc: t(lang, 'why5Desc') },
    { icon: '📱', title: t(lang, 'why6Title'), desc: t(lang, 'why6Desc') },
  ];
  return (
    <section id="why" className="relative py-16 md:py-24 px-5 md:px-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'whyBadge')}
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
            {t(lang, 'whyTitle')}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-xl p-4 md:p-5 border border-white/10 hover:border-white/25 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="text-3xl md:text-4xl mb-2">{it.icon}</div>
              <div className="font-display font-extrabold text-white text-[15px] md:text-[16px]">
                {it.title}
              </div>
              <div className="text-[12.5px] md:text-[13px] text-white/55 mt-1 leading-relaxed">
                {it.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============== TESTIMONIALS ============== */
const HomeTestimonials = ({ lang }) => (
  <section className="relative py-16 md:py-20 px-5 md:px-8">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
          {t(lang, 'testimonialsBadge')}
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
          {t(lang, 'testimonialsTitle')}
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3 md:gap-4">
        {TESTIMONIALS.map((tt) => (
          <div
            key={tt.name}
            className="rounded-2xl p-5 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="flex items-center gap-1 text-amber-400 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="w-4 h-4" />
              ))}
            </div>
            <p className="text-[13.5px] text-white/75 leading-relaxed">"{tr(tt, 'text', lang)}"</p>
            <div className="flex items-center gap-2.5 mt-4">
              <img loading="lazy" decoding="async" src={tt.avatar} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="text-[13px] font-bold text-white">{tr(tt, 'name', lang)}</div>
                <div className="text-[11px] text-white/50">{tr(tt, 'city', lang)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============== FINAL CTA ============== */
const FinalCTA = ({ onStart, lang }) => (
  <section className="relative py-16 md:py-24 px-5 md:px-8">
    <div
      className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${ACCENT}, #ec4899 60%, #f59e0b)`,
      }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
      <div className="relative">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white">
          {t(lang, 'finalBadge')}
        </div>
        <h2 className="font-display text-2xl md:text-5xl font-extrabold text-white mt-4 leading-tight">
          {t(lang, 'finalTitle')}
        </h2>
        <p className="text-[14px] md:text-[16px] text-white/90 mt-3 max-w-xl mx-auto">
          {t(lang, 'finalSubtitle')}
        </p>
        <button
          onClick={onStart}
          className="mt-6 md:mt-8 text-[15px] md:text-[18px] font-extrabold px-8 md:px-12 py-4 md:py-5 rounded-2xl bg-white text-gray-900 hover:scale-105 transition-transform shadow-2xl"
        >
          {t(lang, 'finalCTA')}
        </button>
        <div className="text-[12px] text-white/85 mt-4">
          {t(lang, 'finalNote')}
        </div>
      </div>
    </div>
  </section>
);

/* ============== HOME FOOTER ============== */
const HomeFooter = ({ onPricing, onContact, onAbout, onBlog, onPrivacy, onTerms, lang }) => (
  <footer className="border-t border-white/5 py-10 px-5 md:px-8">
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-[13px]">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <img loading="lazy" decoding="async" src={logo} alt="Website Lagbo Logo" className="h-12 w-auto object-contain" />
        </div>
        <p className="text-white/55 max-w-sm leading-relaxed">
          {lang === 'en'
            ? 'Affordable, beautiful websites for Bangladesh’s small businesses. 48-hour delivery. 100% Bangla support.'
            : 'বাংলাদেশের ছোট ব্যবসার জন্য সাশ্রয়ী, সুন্দর ওয়েবসাইট। ৪৮ ঘণ্টায় ডেলিভারি। ১০০% বাংলায় সাপোর্ট।'}
        </p>
      </div>
      <div>
        <div className="text-[11px] font-extrabold tracking-wider text-white/45 uppercase mb-3">
          {lang === 'en' ? 'Pages' : 'পেজ'}
        </div>
        <div className="space-y-2 text-white/65">
          <div><button onClick={onAbout} className="hover:text-white">{t(lang, 'navAbout')}</button></div>
          <div><button onClick={onPricing} className="hover:text-white">{t(lang, 'navPricing')}</button></div>
          <div><button onClick={onBlog} className="hover:text-white">{t(lang, 'navBlog')}</button></div>
          <div><button onClick={onContact} className="hover:text-white">{t(lang, 'navContact')}</button></div>
        </div>
      </div>
      <div>
        <div className="text-[11px] font-extrabold tracking-wider text-white/45 uppercase mb-3">
          {lang === 'en' ? 'Legal' : 'আইনি'}
        </div>
        <div className="space-y-2 text-white/65">
          <div><button onClick={onPrivacy} className="hover:text-white">{t(lang, 'navPrivacy')}</button></div>
          <div><button onClick={onTerms} className="hover:text-white">{t(lang, 'navTerms')}</button></div>
          <div className="pt-3"><a href={`tel:+88${CONTACT_INFO.phone}`} className="hover:text-white">📞 {CONTACT_INFO.phoneDisplay}</a></div>
          <div><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">📧 {CONTACT_INFO.email}</a></div>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-[12px] text-white/40 text-center">
      © {new Date().getFullYear()} Website Lagbo · {lang === 'en' ? 'All rights reserved.' : 'সর্বস্বত্ব সংরক্ষিত।'}
    </div>
  </footer>
);

/* ============== HOME BACKGROUND (immersive animated layers) ============== */
const HomeBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {/* Layer 1: subtle blurred bg image — purple/pink mesh, slow zoom drift */}
    <div
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(28px) saturate(160%)',
        animation: 'slowZoom 70s ease-in-out infinite alternate',
      }}
    />
    {/* Layer 2: animated indigo grid — drifts diagonally */}
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(99,102,241,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.45) 1px, transparent 1px)',
        backgroundSize: '60px 60px, 60px 60px',
        animation: 'gridDrift 60s linear infinite',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 80%)',
      }}
    />
    {/* Layer 3: floating colored orbs */}
    <span
      className="absolute w-[28rem] h-[28rem] rounded-full blur-3xl"
      style={{
        background: 'radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 70%)',
        top: '8%',
        left: '-8%',
        animation: 'orbFloat1 22s ease-in-out infinite',
      }}
    />
    <span
      className="absolute w-[32rem] h-[32rem] rounded-full blur-3xl"
      style={{
        background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-8%',
        animation: 'orbFloat2 28s ease-in-out infinite',
      }}
    />
    <span
      className="absolute w-[26rem] h-[26rem] rounded-full blur-3xl opacity-50"
      style={{
        background: 'radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'orbFloat3 30s ease-in-out infinite',
      }}
    />
    {/* Layer 4: light sweep across screen */}
    <span
      className="absolute top-0 -left-40 w-40 h-full opacity-0"
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.08) 70%, transparent)',
        animation: 'lightSweep 14s ease-in-out infinite',
      }}
    />
    {/* Layer 5: subtle film grain */}
    <div
      className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '220px 220px',
      }}
    />
    {/* Layer 6: vignette so edges fade gently */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 50%, rgba(7,9,26,0.65) 100%)',
      }}
    />
  </div>
);

/* ============== MAIN HOMEPAGE ============== */
export default function HomePage({ onStart, onPricing, onContact, onAbout, onBlog, onPrivacy, onTerms, lang = 'bn', onToggleLang }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENT);
  }, []);

  return (
    <div className="absolute inset-0 overflow-y-auto nice-scroll">
      <HomeBackground />
      <div className="relative z-10">
      <Nav onStart={onStart} onPricing={onPricing} onContact={onContact} onAbout={onAbout} onBlog={onBlog} lang={lang} onToggleLang={onToggleLang} />
      <Hero onStart={onStart} lang={lang} />
      <TrustBar lang={lang} />
      <StatsCounter lang={lang} />
      <FeaturedExamples onStart={onStart} lang={lang} />
      <HowItWorks lang={lang} />
      <SiteTypesShowcase onStart={onStart} lang={lang} />
      <WhyUs lang={lang} />
      <ComparisonTable lang={lang} />
      <PressFeatures lang={lang} />
      <HomeTestimonials lang={lang} />
      <FinalCTA onStart={onStart} lang={lang} />
      <HomeFooter
        onPricing={onPricing}
        onContact={onContact}
        onAbout={onAbout}
        onBlog={onBlog}
        onPrivacy={onPrivacy}
        onTerms={onTerms}
        lang={lang}
      />
      </div>
      <HomeWhatsAppFAB lang={lang} />
    </div>
  );
}
