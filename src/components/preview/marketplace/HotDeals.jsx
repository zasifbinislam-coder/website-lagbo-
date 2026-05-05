import { useEffect, useState } from 'react';
import { HOT_DEALS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const pad = (n) => String(n).padStart(2, '0');

const HotDeals = ({ accent }) => {
  const [now, setNow] = useState(Date.now());
  const t = useT();
  const tr = useTr();

  // Countdown to end of today (Asia/Dhaka style — local browser time)
  useEffect(() => {
    const tm = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tm);
  }, []);

  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now);
  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);

  return (
    <section
      className="section-in px-4 md:px-8 py-6"
      style={{ background: 'linear-gradient(135deg, #fff7ed, #fef2f2)' }}
    >
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div>
          <div className="inline-block text-[10.5px] font-extrabold tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-700">
            {t('marketplaceHotDealsBadge')}
          </div>
          <h2 className="font-display text-lg md:text-xl font-extrabold text-gray-900 mt-1">
            {t('marketplaceHotDealsHeading')}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-gray-600">{t('marketplaceEndsIn')}</span>
          {[
            { v: h, l: t('marketplaceUnitHr') },
            { v: m, l: t('marketplaceUnitMin') },
            { v: s, l: t('marketplaceUnitSec') },
          ].map((u, i) => (
            <span
              key={i}
              className="text-[12px] font-extrabold text-white px-2 py-1 rounded-md tabular-nums"
              style={{ background: accent }}
            >
              {pad(u.v)}
              <span className="opacity-70 ml-0.5 text-[10px]">{u.l}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {HOT_DEALS.map((d) => {
          const pct = Math.min(95, 30 + d.sold % 70);
          return (
            <div
              key={d.id}
              className="rounded-xl bg-white border border-amber-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img loading="lazy" decoding="async" src={d.img} alt={tr(d, 'name')} className="w-full h-24 object-cover" />
                <span
                  className="absolute top-1.5 left-1.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded text-white"
                  style={{ background: accent }}
                >
                  -{d.discount}%
                </span>
              </div>
              <div className="p-2">
                <div className="text-[11.5px] font-bold text-gray-900 leading-tight line-clamp-1">
                  {tr(d, 'name')}
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[12.5px] font-extrabold" style={{ color: accent }}>
                    {formatBDT(d.price)}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">
                    {formatBDT(d.oldPrice)}
                  </span>
                </div>
                <div className="mt-1.5">
                  <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${accent}, #f59e0b)`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-semibold text-gray-600 mt-0.5">
                    🔥 {d.sold} {t('marketplaceSoldSuffix')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HotDeals;
