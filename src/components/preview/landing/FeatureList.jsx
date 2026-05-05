import { LANDING_FEATURES } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const FeatureList = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-5">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('featureBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('featureTitle')}
        </h2>
        <p className="text-[12.5px] md:text-[13.5px] text-gray-500 mt-1">
          {t('featureSubtitle')}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
        {LANDING_FEATURES.map((f) => (
          <div
            key={f.num}
            className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm transition-shadow"
          >
            <span
              className="shrink-0 w-9 h-9 rounded-lg grid place-items-center text-white font-extrabold text-[12px]"
              style={{
                background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #ec4899))`,
              }}
            >
              {f.num}
            </span>
            <div className="min-w-0">
              <div className="text-[12.5px] md:text-[13px] font-bold text-gray-900 flex items-center gap-1">
                <span>{f.emoji}</span>
                <span className="truncate">{tr(f, 'title')}</span>
              </div>
              <div className="text-[11.5px] text-gray-500 leading-snug mt-0.5">{tr(f, 'desc')}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureList;
