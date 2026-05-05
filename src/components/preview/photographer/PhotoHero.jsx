import { PHOTO_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const PhotoHero = ({ accent }) => {
  const p = PHOTO_INFO;
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in relative overflow-hidden">
      <div className="relative h-56 md:h-72">
        <img loading="lazy" decoding="async" src={p.hero} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-5 md:px-10 py-6 text-white">
          <div className="text-[11px] font-bold tracking-wider opacity-90 uppercase">⭐ {p.rating} · {p.reviews}+ {t('photoHeroClientsSuffix')}</div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold mt-1 tracking-tight">{tr(p, 'name')}</h1>
          <p className="text-[13.5px] opacity-95 mt-1.5 max-w-md">{tr(p, 'tagline')}</p>
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-bold px-4 py-2.5 rounded-lg">{t('photoBookShoot')}</button>
            <button className="text-[13px] font-bold px-4 py-2.5 rounded-lg bg-white/15 backdrop-blur border border-white/30">{t('photoViewPortfolio')}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoHero;
