import { BUNDLE_OFFERS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const BundleOffer = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-6 bg-white">
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('bundleBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('bundleTitle')}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {BUNDLE_OFFERS.map((b, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden p-4 text-white" style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))` }}>
            <div className="text-3xl mb-1.5">{b.emoji}</div>
            <div className="text-[10.5px] font-extrabold tracking-wider opacity-80 uppercase">{tr(b, 'tag')}</div>
            <div className="text-[14px] font-extrabold leading-tight mt-0.5">{tr(b, 'title')}</div>
            <div className="text-[11.5px] opacity-90 leading-snug mt-1.5">{tr(b, 'desc')}</div>
            <button className="mt-3 text-[11px] font-bold px-3 py-1.5 rounded-md bg-white text-gray-900 hover:bg-gray-100">
              {t('bundleClaim')}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BundleOffer;
