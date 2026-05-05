import Icon from '../../Icon.jsx';
import { COMPARISON_ROWS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const ComparisonTable = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#fafafa' }}
    >
      <div className="text-center mb-5">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('comparisonBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('comparisonTitle')}
        </h2>
        <p className="text-[12.5px] text-gray-500 mt-1">{t('comparisonSubtitle')}</p>
      </div>

      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_auto] items-center">
          <div className="px-4 py-3 text-[11.5px] font-bold text-gray-600 uppercase tracking-wider">
            {t('comparisonFeature')}
          </div>
          <div
            className="px-3 md:px-5 py-3 text-center text-white text-[12px] md:text-[13px] font-extrabold"
            style={{
              background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`,
            }}
          >
            {t('comparisonUs')}
          </div>
          <div className="px-3 md:px-5 py-3 text-center text-gray-500 text-[12px] md:text-[13px] font-bold bg-gray-50">
            {t('comparisonOthers')}
          </div>
        </div>

        {/* Rows */}
        {COMPARISON_ROWS.map((r, i) => (
          <div
            key={r.feature}
            className={`grid grid-cols-[1fr_auto_auto] items-center ${
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
            }`}
          >
            <div className="px-4 py-2.5 text-[12.5px] md:text-[13px] text-gray-800 font-medium">
              {tr(r, 'feature')}
            </div>
            <div
              className="px-3 md:px-5 py-2.5 text-center"
              style={{ background: `${accent}08` }}
            >
              {r.us ? (
                <span
                  className="inline-grid place-items-center w-6 h-6 rounded-full text-white"
                  style={{ background: accent }}
                >
                  <Icon name="check" className="w-3.5 h-3.5" stroke={3} />
                </span>
              ) : (
                <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-[14px] font-bold">
                  ×
                </span>
              )}
            </div>
            <div className="px-3 md:px-5 py-2.5 text-center">
              {r.them ? (
                <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-gray-300 text-white">
                  <Icon name="check" className="w-3.5 h-3.5" stroke={3} />
                </span>
              ) : (
                <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-[14px] font-bold">
                  ×
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonTable;
