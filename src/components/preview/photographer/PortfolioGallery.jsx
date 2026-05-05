import { PORTFOLIO } from '../../../data/content.js';
import { useT } from '../../../lang/LangContext.jsx';

const PortfolioGallery = ({ accent }) => {
  const t = useT();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#0a0a0a', color: '#fff' }}>
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}33`, color: '#fff' }}>
          {t('photoPortfolioBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold mt-2">{t('photoPortfolioHeading')}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PORTFOLIO.map((src, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg group cursor-pointer ${i === 0 || i === 3 ? 'col-span-2 row-span-2' : ''}`}
            style={{ aspectRatio: i === 0 || i === 3 ? '1/1' : '1/1' }}
          >
            <img loading="lazy" decoding="async" src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGallery;
