import Icon from '../../Icon.jsx';
import { PRODUCTS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const FeaturedProducts = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-4 md:px-8 py-6 bg-gray-50">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div
            className="inline-block text-[10.5px] font-extrabold tracking-wider px-2 py-0.5 rounded"
            style={{ background: `${accent}18`, color: accent }}
          >
            {t('marketplaceFeaturedBadge')}
          </div>
          <h2 className="font-display text-lg md:text-xl font-extrabold text-gray-900 mt-1">
            {t('marketplaceFeaturedHeading')}
          </h2>
        </div>
        <button className="text-[12px] font-semibold" style={{ color: accent }}>
          {t('marketplaceFeaturedSeeMore')}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="rounded-xl bg-white border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img loading="lazy" decoding="async" src={p.img} alt={tr(p, 'name')} className="w-full h-24 md:h-28 object-cover" />
              {p.tag && (
                <span
                  className="absolute top-1.5 left-1.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded text-white"
                  style={{ background: accent }}
                >
                  {tr(p, 'tag')}
                </span>
              )}
            </div>
            <div className="p-2">
              <div className="text-[11.5px] font-bold text-gray-900 leading-tight line-clamp-2">
                {tr(p, 'name')}
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="w-2.5 h-2.5" />
                ))}
                <span className="text-[9.5px] text-gray-400 ml-0.5">{t('marketplaceReviewCount')}</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[12.5px] font-extrabold" style={{ color: accent }}>
                  {formatBDT(p.price)}
                </span>
                {p.oldPrice && (
                  <span className="text-[10px] text-gray-400 line-through">
                    {formatBDT(p.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
