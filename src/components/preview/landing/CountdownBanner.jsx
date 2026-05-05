import { useEffect, useState } from 'react';
import { useT } from '../../../lang/LangContext.jsx';

const pad = (n) => String(n).padStart(2, '0');

const CountdownBanner = ({ accent }) => {
  const [now, setNow] = useState(Date.now());
  const t = useT();

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now);
  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);

  return (
    <section
      className="section-in relative overflow-hidden"
      style={{
        background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`,
      }}
    >
      <div className="px-4 md:px-8 py-2.5 flex items-center justify-center gap-3 text-white">
        <span className="text-base md:text-lg">⏰</span>
        <span className="text-[12px] md:text-[13.5px] font-semibold">
          {t('countdownLabel')}
        </span>
        <div className="flex items-center gap-1">
          {[
            { v: h, l: t('countdownHours') },
            { v: m, l: t('countdownMinutes') },
            { v: s, l: t('countdownSeconds') },
          ].map((u, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur rounded-md px-2 py-1 text-center min-w-[44px] tabular-nums"
            >
              <div className="text-[14px] md:text-[15px] font-extrabold leading-none">
                {pad(u.v)}
              </div>
              <div className="text-[8.5px] opacity-80 leading-none mt-0.5">{u.l}</div>
            </div>
          ))}
        </div>
        <span className="hidden md:inline text-[11.5px] font-semibold opacity-90">
          {t('countdownTrailing')}
        </span>
      </div>
    </section>
  );
};

export default CountdownBanner;
