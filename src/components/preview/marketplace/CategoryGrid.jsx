import { CATEGORIES } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const CategoryGrid = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-4 md:px-8 py-5 bg-white">
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-display text-base md:text-lg font-extrabold text-gray-900">
          {t('marketplaceCategoryHeading')}
        </h2>
        <button className="text-[12px] font-semibold" style={{ color: accent }}>
          {t('marketplaceSeeAll')}
        </button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.name}
            className="group flex flex-col items-center gap-1.5 p-2 md:p-3 rounded-xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 hover:shadow-sm hover:border-gray-200 transition-all"
          >
            <span
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl grid place-items-center text-2xl md:text-3xl group-hover:scale-110 transition-transform"
              style={{ background: `${accent}15` }}
            >
              {c.emoji}
            </span>
            <span className="text-[11px] md:text-[12px] font-bold text-gray-800 text-center leading-tight line-clamp-1">
              {tr(c, 'name')}
            </span>
            <span className="text-[10px] text-gray-500">{c.count}{t('marketplaceItemsSuffix')}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
