import { useEffect, useState } from 'react';
import { LIVE_ORDERS, LANDING_PRODUCT } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const LiveOrders = ({ accent }) => {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  const t = useT();
  const tr = useTr();

  useEffect(() => {
    let mounted = true;
    let hideTimer;
    let nextTimer;
    const cycle = () => {
      if (!mounted) return;
      setShow(true);
      hideTimer = setTimeout(() => {
        if (!mounted) return;
        setShow(false);
        nextTimer = setTimeout(() => {
          if (!mounted) return;
          setIdx((i) => (i + 1) % LIVE_ORDERS.length);
          cycle();
        }, 600);
      }, 4000);
    };
    cycle();
    return () => {
      mounted = false;
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  const o = LIVE_ORDERS[idx];

  return (
    <div
      className="absolute left-3 bottom-3 md:left-4 md:bottom-4 z-20 transition-all duration-500 pointer-events-none"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="flex items-center gap-2.5 bg-white shadow-xl rounded-xl border border-gray-100 pl-1.5 pr-3 py-1.5 max-w-[280px]">
        <div className="relative">
          <img loading="lazy" decoding="async" src={o.avatar} className="w-10 h-10 rounded-lg object-cover" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full grid place-items-center text-white text-[8px]"
            style={{ background: accent }}
          >
            ✓
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] text-gray-700 leading-tight">
            <span className="font-bold">{tr(o, 'name')}</span>{' '}
            <span className="text-gray-500">({tr(o, 'city')})</span>
          </div>
          <div className="text-[11px] text-gray-700 leading-tight mt-0.5">
            {t('liveOrderText')}{' '}
            <span className="font-semibold" style={{ color: accent }}>
              {tr(LANDING_PRODUCT, 'name')}
            </span>
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">⏱ {tr(o, 'timeAgo')}</div>
        </div>
      </div>
    </div>
  );
};

export default LiveOrders;
