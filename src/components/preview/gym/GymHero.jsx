import Icon from '../../Icon.jsx';
import { GYM_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const GymHero = ({ accent }) => {
  const g = GYM_INFO;
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in relative overflow-hidden">
      <div className="relative h-56 md:h-72">
        <img loading="lazy" decoding="async" src={g.hero} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-5 md:px-10 text-white max-w-md">
          <div className="text-[11px] font-bold tracking-wider opacity-90 uppercase">⭐ {g.rating} · {g.reviews}+ {t('gymHeroMembersSuffix')}</div>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold leading-tight mt-1">{tr(g, 'name')}</h1>
          <p className="text-[13.5px] opacity-95 mt-1.5">{tr(g, 'tagline')}</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-bold px-4 py-2.5 rounded-lg">{t('gymFreeTrial')}</button>
            <a href="tel:01XXXXXXXXX" onClick={(e) => e.preventDefault()} className="text-[13px] font-bold px-4 py-2.5 rounded-lg bg-white/15 backdrop-blur border border-white/30 flex items-center gap-1.5">
              <Icon name="phone" className="w-4 h-4" />{t('gymCallNow')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymHero;
