import PageShell from './PageShell.jsx';
import { ABOUT_TEAM, t, tr } from '../data/content.js';

const ACCENT = '#6366f1';

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
    <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-20 text-center">
      <div className="inline-flex items-center gap-2 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
        {t(lang, 'aboutHeroBadge')}
      </div>
      <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.15] mt-5 text-white">
        {t(lang, 'aboutHeroTitle')}
      </h1>
      <p className="text-[14px] md:text-[16px] text-white/65 mt-4 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
        {t(lang, 'aboutHeroSubtitle')}
      </p>
    </div>
  </section>
);

const Mission = ({ lang }) => (
  <section className="relative py-12 md:py-20 px-5 md:px-8">
    <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
        {t(lang, 'aboutMissionBadge')}
      </div>
      <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
        {t(lang, 'aboutMissionTitle')}
      </h2>
      <p className="text-[14.5px] md:text-[16px] text-white/70 mt-4 leading-relaxed">
        {t(lang, 'aboutMissionDesc')}
      </p>
    </div>
  </section>
);

const Values = ({ lang }) => {
  const values = [
    { icon: '🤝', title: t(lang, 'aboutValue1Title'), desc: t(lang, 'aboutValue1Desc') },
    { icon: '💎', title: t(lang, 'aboutValue2Title'), desc: t(lang, 'aboutValue2Desc') },
    { icon: '⚡', title: t(lang, 'aboutValue3Title'), desc: t(lang, 'aboutValue3Desc') },
    { icon: '🇧🇩', title: t(lang, 'aboutValue4Title'), desc: t(lang, 'aboutValue4Desc') },
  ];
  return (
    <section className="relative py-12 md:py-20 px-5 md:px-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'aboutValuesBadge')}
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
            {t(lang, 'aboutValuesTitle')}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-5 md:p-6 border border-white/10 lift-on-hover"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="text-3xl md:text-4xl mb-3">{v.icon}</div>
              <div className="font-display font-extrabold text-white text-[15px] md:text-[16px]">{v.title}</div>
              <div className="text-[12.5px] md:text-[13.5px] text-white/55 mt-1.5 leading-relaxed">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = ({ lang }) => (
  <section className="relative py-12 md:py-20 px-5 md:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
          {t(lang, 'aboutTeamBadge')}
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-3">
          {t(lang, 'aboutTeamTitle')}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {ABOUT_TEAM.map((m) => (
          <div
            key={m.name}
            className="rounded-2xl p-6 border border-white/10 text-center lift-on-hover"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <img loading="lazy" decoding="async"
              src={m.avatar}
              alt={tr(m, 'name', lang)}
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/10"
            />
            <div className="font-display font-extrabold text-white text-[16px] mt-4">{tr(m, 'name', lang)}</div>
            <div className="text-[12.5px] font-bold mt-1" style={{ color: ACCENT }}>{tr(m, 'role', lang)}</div>
            <div className="text-[12.5px] text-white/55 mt-2 leading-relaxed">{tr(m, 'bio', lang)}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = ({ onContact, onStart, lang }) => (
  <section className="relative py-12 md:py-20 px-5 md:px-8">
    <div
      className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${ACCENT}, #ec4899 60%, #f59e0b)`,
      }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
      <div className="relative">
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white">
          {t(lang, 'aboutCTAHeading')}
        </h2>
        <p className="text-[14px] md:text-[16px] text-white/90 mt-3">
          {t(lang, 'aboutCTASub')}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={onStart}
            className="text-[14px] font-extrabold px-6 py-3 rounded-xl bg-white text-gray-900 hover:scale-105 transition-transform shadow-2xl"
          >
            {t(lang, 'navFreeDemo')}
          </button>
          <button
            onClick={onContact}
            className="text-[14px] font-extrabold px-6 py-3 rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
          >
            {t(lang, 'navContact')}
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default function AboutPage(props) {
  const { onContact, onStart } = props;
  return (
    <PageShell {...props} current="about">
      <Hero lang={props.lang} />
      <Mission lang={props.lang} />
      <Values lang={props.lang} />
      <Team lang={props.lang} />
      <CTA onContact={onContact} onStart={onStart} lang={props.lang} />
    </PageShell>
  );
}
