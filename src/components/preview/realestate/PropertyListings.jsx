import Icon from '../../Icon.jsx';
import { PROPERTIES } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const PropertyListings = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
            {t('realEstateListingBadge')}
          </div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-1.5">{t('realEstateListingHeading')}</h2>
        </div>
        <button className="text-[12px] font-semibold" style={{ color: accent }}>{t('realEstateSeeAll')}</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {PROPERTIES.map((p) => (
          <div key={p.id} className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all">
            <div className="relative">
              <img loading="lazy" decoding="async" src={p.img} alt={tr(p, 'title')} className="w-full h-40 object-cover" />
              <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white" style={{ background: accent }}>
                {tr(p, 'tag')}
              </span>
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 text-gray-800">
                {tr(p, 'status')}
              </span>
            </div>
            <div className="p-3">
              <div className="text-[13px] font-bold text-gray-900 leading-tight">{tr(p, 'title')}</div>
              <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                <Icon name="pin" className="w-3 h-3" />{tr(p, 'location')}
              </div>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-700">
                {p.beds > 0 && <span>🛏 {p.beds} {t('realEstateBedSuffix')}</span>}
                {p.baths > 0 && <span>🚿 {p.baths} {t('realEstateBathSuffix')}</span>}
                <span>📐 {p.area} {p.type === 'প্লট' ? t('realEstateUnitKatha') : t('realEstateUnitSqft')}</span>
              </div>
              <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
                <div className="text-[14px] font-extrabold" style={{ color: accent }}>
                  {formatBDT(p.price)}{p.status === 'ভাড়ার জন্য' && <span className="text-[10px] font-medium text-gray-500">{t('realEstatePerMonth')}</span>}
                </div>
                <button className="text-[11px] font-bold px-2.5 py-1 rounded-md text-white" style={{ background: accent }}>
                  {t('realEstateVisitBtn')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyListings;
