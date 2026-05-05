import Icon from '../../Icon.jsx';
import { RESTAURANT_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const RestaurantHero = ({ accent }) => {
  const r = RESTAURANT_INFO;
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in relative overflow-hidden">
      <div className="relative h-56 md:h-72">
        <img loading="lazy" decoding="async" src={r.hero} alt={tr(r, 'name')} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 md:px-8 py-5 text-white">
          <div
            className="inline-flex items-center gap-1.5 self-start text-[10.5px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2"
            style={{ background: accent, color: '#fff' }}
          >
            ⭐ {r.rating} · {r.reviews}+ {t('restaurantReviewsSuffix')}
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold leading-tight">{tr(r, 'name')}</h1>
          <div className="text-[12.5px] md:text-sm opacity-90 mt-0.5">{r.banglaName}</div>
          <p className="text-[13px] md:text-[15px] opacity-95 mt-1.5 max-w-md">{tr(r, 'tagline')}</p>
          <div className="flex items-center gap-3 mt-3 text-[12px]">
            <span className="flex items-center gap-1.5">
              <Icon name="pin" className="w-3.5 h-3.5" />
              {tr(r, 'address')}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-300">
              <Icon name="clock" className="w-3.5 h-3.5" />
              {tr(r, 'hours')}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-bold px-4 py-2.5 rounded-lg">
              {t('restaurantOrderOnline')}
            </button>
            <button
              className="text-[13px] font-bold px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 transition-colors"
            >
              {t('restaurantReserveTable')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantHero;
