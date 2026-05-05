import { COMBO_PACKS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const ComboBundles = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-4 md:px-8 py-6 bg-white">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div
            className="inline-block text-[10.5px] font-extrabold tracking-wider px-2 py-0.5 rounded"
            style={{ background: `${accent}18`, color: accent }}
          >
            {t('marketplaceComboBadge')}
          </div>
          <h2 className="font-display text-lg md:text-xl font-extrabold text-gray-900 mt-1">
            {t('marketplaceComboHeading')}
          </h2>
        </div>
        <button className="text-[12px] font-semibold" style={{ color: accent }}>
          {t('marketplaceComboSeeAll')}
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {COMBO_PACKS.map((c) => {
          const save = c.oldPrice - c.price;
          const pct = Math.round((save / c.oldPrice) * 100);
          return (
            <div
              key={c.name}
              className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img loading="lazy" decoding="async" src={c.img} alt={tr(c, 'name')} className="w-full h-32 object-cover" />
                <span
                  className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded text-white"
                  style={{ background: accent }}
                >
                  {t('marketplaceComboSavePrefix')} {pct}%
                </span>
              </div>
              <div className="p-3">
                <div className="text-[13px] font-bold text-gray-900 leading-tight">{tr(c, 'name')}</div>
                <div className="text-[11.5px] text-gray-500 mt-0.5 line-clamp-1">{tr(c, 'items')}</div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[15px] font-extrabold" style={{ color: accent }}>
                    {formatBDT(c.price)}
                  </span>
                  <span className="text-[11.5px] text-gray-400 line-through">
                    {formatBDT(c.oldPrice)}
                  </span>
                </div>
                <button
                  className="w-full mt-2 text-[11.5px] font-bold py-2 rounded-md text-white"
                  style={{ background: accent }}
                >
                  {t('marketplaceComboAddToCart')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ComboBundles;
