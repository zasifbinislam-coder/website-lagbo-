import { PAYMENT_METHODS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const PaymentMethods = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-6 bg-white">
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('paymentBadge')}
        </div>
        <h2 className="font-display text-lg md:text-xl font-extrabold text-gray-900 mt-1.5">
          {t('paymentTitle')}
        </h2>
        <p className="text-[12px] text-gray-500 mt-1">
          {t('paymentSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5 max-w-2xl mx-auto">
        {PAYMENT_METHODS.map((p) => (
          <div
            key={p.name}
            className="rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div
              className="px-3 py-3 md:py-4 flex flex-col items-center gap-1.5 text-center"
              style={{ background: p.bg, color: p.text }}
            >
              <span className="text-2xl md:text-3xl">{p.emoji}</span>
              <span className="text-[12px] md:text-[12.5px] font-extrabold leading-tight">
                {p.name}
              </span>
            </div>
            <div className="px-2 py-1.5 text-[10.5px] font-semibold text-gray-600 text-center bg-gray-50 truncate">
              {tr(p, 'short')}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[11px] text-gray-500 mt-4 flex items-center justify-center gap-2">
        {t('paymentSecure')}
      </div>
    </section>
  );
};

export default PaymentMethods;
