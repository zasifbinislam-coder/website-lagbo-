import { useEffect, useState } from 'react';
import { CAROUSEL_BANNERS } from '../../../data/content.js';
import { useTr } from '../../../lang/LangContext.jsx';

const MarketplaceHero = ({ accent }) => {
  const [idx, setIdx] = useState(0);
  const tr = useTr();

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % CAROUSEL_BANNERS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-in relative bg-gray-50">
      <div className="relative h-44 md:h-64 overflow-hidden">
        {CAROUSEL_BANNERS.map((b, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            <img loading="lazy" decoding="async" src={b.img} alt={tr(b, 'title')} className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${b.tint}cc 0%, ${b.tint}55 50%, transparent 100%)`,
              }}
            />
            <div className="relative h-full flex flex-col justify-center px-5 md:px-10 text-white max-w-md">
              <div className="text-[11px] md:text-[12.5px] font-bold uppercase tracking-wider opacity-90">
                {tr(b, 'subtitle')}
              </div>
              <h1 className="font-display text-xl md:text-3xl font-extrabold leading-tight mt-1">
                {tr(b, 'title')}
              </h1>
              <button
                className="self-start mt-3 text-[12px] md:text-[13px] font-bold px-4 py-2 rounded-lg bg-white shadow"
                style={{ color: b.tint }}
              >
                {tr(b, 'cta')} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-1.5">
        {CAROUSEL_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === idx ? 22 : 8,
              background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MarketplaceHero;
