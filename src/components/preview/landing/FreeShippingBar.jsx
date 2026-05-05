import Icon from '../../Icon.jsx';
import { FREE_SHIPPING } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT } from '../../../lang/LangContext.jsx';

const FreeShippingBar = ({ accent }) => {
  const remaining = Math.max(0, FREE_SHIPPING.threshold - FREE_SHIPPING.current);
  const pct = Math.min(100, (FREE_SHIPPING.current / FREE_SHIPPING.threshold) * 100);
  const t = useT();

  return (
    <section
      className="section-in py-2.5 px-4 md:px-8 border-b border-emerald-100"
      style={{ background: 'linear-gradient(90deg, #ecfdf5, #f0fdf4, #ecfeff)' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-white"
          style={{ background: '#10b981' }}
        >
          <Icon name="truck" className="w-4 h-4" stroke={2.4} />
        </div>
        <div className="flex-1 min-w-0">
          {remaining > 0 ? (
            <>
              <div className="text-[12px] md:text-[12.5px] font-bold text-gray-800">
                {t('freeShipMorePrefix')} <span style={{ color: accent }}>{formatBDT(remaining)}</span> {t('freeShipMoreSuffix')}{' '}
                <span className="text-emerald-600">{t('freeShipFreeDelivery')}</span>
              </div>
              <div className="h-1.5 mt-1 rounded-full overflow-hidden bg-emerald-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, #10b981, #34d399)',
                  }}
                />
              </div>
            </>
          ) : (
            <div className="text-[12.5px] font-extrabold text-emerald-700">
              {t('freeShipQualified')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreeShippingBar;
