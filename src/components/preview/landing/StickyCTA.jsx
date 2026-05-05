import { LANDING_PRODUCT } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT } from '../../../lang/LangContext.jsx';

const StickyCTA = ({ accent }) => {
  const t = useT();
  return (
    <div className="absolute left-0 right-0 bottom-0 z-30 px-3 pb-2 pt-3 pointer-events-none">
      <div
        className="pointer-events-auto rounded-2xl shadow-2xl border border-white/20 backdrop-blur flex items-center gap-2 p-2"
        style={{
          background: 'rgba(17,24,39,0.92)',
        }}
      >
        <img loading="lazy" decoding="async"
          src={LANDING_PRODUCT.gallery[0]}
          className="w-10 h-10 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-white/70 leading-none">
            {t('stickyJustWord')} <span className="line-through opacity-70">{formatBDT(LANDING_PRODUCT.oldPrice)}</span>
          </div>
          <div className="text-[15px] font-extrabold text-white leading-tight tabular-nums">
            {formatBDT(LANDING_PRODUCT.price)}{' '}
            <span className="text-[10px] font-bold text-emerald-400">{LANDING_PRODUCT.discountPct}% OFF</span>
          </div>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('order-form');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-[12.5px] font-extrabold px-4 py-2.5 rounded-xl text-white whitespace-nowrap"
          style={{
            background: `linear-gradient(180deg, ${accent}, color-mix(in srgb, ${accent} 70%, #000))`,
            boxShadow: `0 8px 22px -8px ${accent}`,
          }}
        >
          {t('stickyOrderBtn')}
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
