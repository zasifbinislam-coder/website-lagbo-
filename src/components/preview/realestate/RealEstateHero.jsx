import Icon from '../../Icon.jsx';
import { REALESTATE_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const RealEstateHero = ({ accent }) => {
  const r = REALESTATE_INFO;
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in relative overflow-hidden">
      <div className="relative h-56 md:h-72">
        <img loading="lazy" decoding="async" src={r.hero} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 md:px-10 py-6 text-white">
          <div className="text-[11px] font-bold tracking-wider opacity-90">⭐ {r.rating} · {r.reviews}{t('realEstateDealsSuffix')}</div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold mt-1">{tr(r, 'name')}</h1>
          <p className="text-[13px] opacity-95 mt-1">{tr(r, 'tagline')}</p>

          {/* Inline search */}
          <div className="mt-4 bg-white rounded-xl shadow-lg p-1.5 max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              <select className="text-[12px] px-2.5 py-2 rounded-md text-gray-700 outline-none">
                <option>{t('realEstateAllTypes')}</option><option>{t('realEstateApartment')}</option><option>{t('realEstateDuplex')}</option><option>{t('realEstatePlot')}</option>
              </select>
              <select className="text-[12px] px-2.5 py-2 rounded-md text-gray-700 outline-none">
                <option>{t('realEstateAllAreas')}</option><option>{t('realEstateAreaDhanmondi')}</option><option>{t('realEstateAreaGulshan')}</option><option>{t('realEstateAreaUttara')}</option>
              </select>
              <select className="text-[12px] px-2.5 py-2 rounded-md text-gray-700 outline-none">
                <option>{t('realEstateAllPrices')}</option><option>{t('realEstatePriceUpTo50')}</option><option>{t('realEstatePriceOver1Cr')}</option>
              </select>
              <button className="text-[12px] font-bold rounded-md text-white" style={{ background: accent }}>
                <Icon name="grid" className="w-3.5 h-3.5 inline mr-1" />{t('realEstateSearch')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateHero;
