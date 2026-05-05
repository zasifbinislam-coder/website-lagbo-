import { useState } from 'react';
import Icon from '../../Icon.jsx';
import { LANDING_PRODUCT } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const LandingHero = ({ accent }) => {
  const [active, setActive] = useState(0);
  const t = useT();
  const tr = useTr();
  const p = LANDING_PRODUCT;

  return (
    <section
      className="section-in relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}1A 0%, ${accent}08 50%, #fff7ed 100%)`,
      }}
    >
      <div className="px-5 md:px-8 py-6 md:py-10 grid md:grid-cols-2 gap-6 items-center">
        {/* Gallery */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-[24px] blur-2xl opacity-50"
            style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
          />
          <div className="relative rounded-2xl overflow-hidden border border-white/40 shadow-xl bg-white">
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-md bg-red-500 text-white shadow-sm">
                🔥 {p.discountPct}% OFF
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                style={{ background: accent }}
              >
                {t('landingHeroBestseller')}
              </span>
            </div>
            <img loading="lazy" decoding="async"
              src={p.gallery[active]}
              alt={tr(p, 'name')}
              className="w-full h-52 md:h-72 object-cover"
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            {p.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  active === i ? 'scale-105' : 'opacity-70'
                }`}
                style={{ borderColor: active === i ? accent : 'transparent' }}
              >
                <img loading="lazy" decoding="async" src={g} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}1A`, color: accent }}
          >
            <Icon name="sparkles" className="w-3 h-3" stroke={2.2} />
            {t('landingHeroBangladesh1')}
          </div>
          <h1 className="font-display text-xl md:text-3xl leading-tight font-extrabold mt-2.5 text-gray-900">
            {tr(p, 'name')}
          </h1>
          <div className="text-[13.5px] md:text-sm text-gray-500 mt-0.5">{p.banglaName}</div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="w-4 h-4" />
              ))}
            </div>
            <span className="text-[12.5px] font-semibold text-gray-800">{p.rating}</span>
            <span className="text-[11.5px] text-gray-500">· {p.reviews}+ {t('landingHeroSatisfiedCustomers')}</span>
          </div>

          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl md:text-4xl font-extrabold" style={{ color: accent }}>
              {formatBDT(p.price)}
            </span>
            <span className="text-[14px] text-gray-400 line-through">{formatBDT(p.oldPrice)}</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
              {t('landingHeroSave')} {formatBDT(p.oldPrice - p.price)}
            </span>
          </div>

          <ul className="mt-3 space-y-1.5">
            {tr(p, 'bullets').map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] text-gray-700">
                <span
                  className="mt-1 w-4 h-4 rounded-full grid place-items-center shrink-0"
                  style={{ background: `${accent}22`, color: accent }}
                >
                  <Icon name="check" className="w-3 h-3" stroke={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 mt-4">
            <a
              href="#order"
              onClick={(e) => {
                e.preventDefault();
                e.currentTarget.closest('.preview-surface')?.querySelector('#order-form')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-[13px] font-bold px-5 py-3 rounded-lg"
            >
              {t('landingHeroOrderNow')}
            </a>
            <a
              href="tel:01XXXXXXXXX"
              onClick={(e) => e.preventDefault()}
              className="text-[13px] font-semibold px-4 py-3 rounded-lg border flex items-center gap-1.5"
              style={{ color: accent, borderColor: `${accent}55` }}
            >
              <Icon name="phone" className="w-4 h-4" />
              {t('landingHeroCall')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
