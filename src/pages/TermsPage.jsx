import PageShell from './PageShell.jsx';
import { TERMS_SECTIONS, t, tr } from '../data/content.js';

export default function TermsPage(props) {
  const { lang = 'bn' } = props;
  return (
    <PageShell {...props} current="terms">
      <section className="relative max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-20">
        <div className="text-[11px] font-extrabold tracking-wider px-3 py-1 inline-block rounded-full bg-white/5 border border-white/10 text-white/70">
          ⚖️ {t(lang, 'termsUpdated')}
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-4">
          {t(lang, 'termsTitle')}
        </h1>
        <div className="mt-8 md:mt-12 space-y-8">
          {TERMS_SECTIONS.map((s, i) => (
            <div key={s.title} className="rounded-2xl p-5 md:p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-extrabold text-white/30 tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
                <h2 className="font-display text-lg md:text-xl font-extrabold text-white">{tr(s, 'title', lang)}</h2>
              </div>
              <p className="text-[14px] md:text-[15px] text-white/65 mt-3 leading-relaxed">
                {tr(s, 'body', lang)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
