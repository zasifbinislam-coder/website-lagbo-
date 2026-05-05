import { STOCK_INFO } from '../../../data/content.js';
import { useT } from '../../../lang/LangContext.jsx';

const StockCounter = ({ accent }) => {
  const pct = (STOCK_INFO.left / STOCK_INFO.total) * 100;
  const t = useT();
  return (
    <section className="section-in px-5 md:px-8 py-3 bg-white">
      <div
        className="rounded-xl border p-3 md:p-3.5 flex items-center gap-3"
        style={{
          background: 'linear-gradient(135deg, #fef2f2, #fff7ed)',
          borderColor: '#fecaca',
        }}
      >
        <div className="text-2xl">🔥</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12.5px] md:text-[13px] font-extrabold text-gray-900">
              {t('stockLeftPrefix')} <span style={{ color: accent }}>{STOCK_INFO.left}</span> {t('stockLeftSuffix')}
            </span>
            <span className="text-[10.5px] md:text-[11px] font-bold text-gray-500">
              {t('stockViewingPrefix')} {STOCK_INFO.viewing} {t('stockViewingSuffix')}
            </span>
          </div>
          <div className="h-2 mt-1.5 rounded-full overflow-hidden bg-gray-200">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${accent}, #f59e0b)`,
              }}
            />
          </div>
          <div className="text-[10.5px] text-gray-600 mt-1 font-medium">
            {t('stockHurry')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockCounter;
