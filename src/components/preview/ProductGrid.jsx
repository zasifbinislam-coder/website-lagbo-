import Icon from '../Icon.jsx';
import { PRODUCTS } from '../../data/content.js';
import { formatBDT } from '../../utils.js';
import { useT, useTr } from '../../lang/LangContext.jsx';

const ProductGrid = ({ accent, onAdd }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-6 bg-white">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="font-display text-lg md:text-xl font-bold text-gray-900">{t('productGridHeading')}</h2>
          <p className="text-[12.5px] text-gray-500">{t('productGridSub')}</p>
        </div>
        <button className="text-[12px] font-semibold" style={{ color: accent }}>
          {t('productGridSeeAll')}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="group rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative">
              <img loading="lazy" decoding="async"
                src={p.img}
                alt={tr(p, 'name')}
                className="w-full h-28 md:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {p.tag && (
                <span
                  className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: accent }}
                >
                  {tr(p, 'tag')}
                </span>
              )}
            </div>
            <div className="p-2.5 md:p-3">
              <div className="text-[12.5px] md:text-[13.5px] font-semibold text-gray-900 leading-tight line-clamp-1">
                {tr(p, 'name')}
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="w-3 h-3" />
                ))}
                <span className="text-[10.5px] text-gray-400 ml-1">{t('productGridReviewCount')}</span>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[13px] md:text-sm font-bold text-gray-900">
                    {formatBDT(p.price)}
                  </span>
                  {p.oldPrice && (
                    <span className="text-[11px] text-gray-400 line-through">
                      {formatBDT(p.oldPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onAdd(p)}
                  className="text-[11px] font-semibold px-2 py-1 rounded-md text-white"
                  style={{ background: accent }}
                >
                  {t('productGridAdd')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
