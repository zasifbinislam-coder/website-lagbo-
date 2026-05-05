import Icon from '../Icon.jsx';
import { formatBDT } from '../../utils.js';
import { useT, useTr } from '../../lang/LangContext.jsx';

const CheckoutSection = ({ accent, cart, onPlace, placing }) => {
  const t = useT();
  const tr = useTr();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 60 : 0;
  const total = subtotal + shipping;

  const fields = [
    { label: t('cartFieldName'), placeholder: t('cartFieldNamePh') },
    { label: t('cartFieldPhone'), placeholder: t('cartFieldPhonePh') },
    { label: t('cartFieldAddress'), placeholder: t('cartFieldAddressPh') },
  ];

  return (
    <section className="section-in px-5 md:px-8 py-6" style={{ background: '#fafafa' }}>
      <h2 className="font-display text-lg md:text-xl font-bold text-gray-900">{t('cartCheckout')}</h2>
      <p className="text-[12.5px] text-gray-500 mb-3">
        {t('cartCheckoutDesc')}
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2.5">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="block text-[11.5px] font-semibold text-gray-600 mb-1">
                {f.label}
              </label>
              <input
                placeholder={f.placeholder}
                className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400"
              />
            </div>
          ))}
          <div>
            <label className="block text-[11.5px] font-semibold text-gray-600 mb-1">
              {t('cartFieldNote')}
            </label>
            <textarea
              rows="2"
              placeholder={t('cartFieldNotePh')}
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400 resize-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3.5">
          <div className="text-[12.5px] font-semibold text-gray-700 mb-2">{t('cartSummary')}</div>
          <div className="space-y-2 max-h-40 overflow-auto nice-scroll pr-1">
            {cart.length === 0 && (
              <div className="text-[12px] text-gray-400 py-4 text-center">
                {t('cartEmpty')}
              </div>
            )}
            {cart.map((i) => (
              <div key={i.id} className="flex items-center gap-2.5">
                <img loading="lazy" decoding="async" src={i.img} className="w-10 h-10 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-medium text-gray-800 truncate">{tr(i, 'name')}</div>
                  <div className="text-[11px] text-gray-500">
                    {t('cartQty')} {i.qty} · {formatBDT(i.price)}
                  </div>
                </div>
                <div className="text-[12.5px] font-semibold text-gray-900">
                  {formatBDT(i.price * i.qty)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-3 pt-2.5 space-y-1 text-[12.5px]">
            <div className="flex justify-between text-gray-600">
              <span>{t('cartSubtotal')}</span>
              <span>{formatBDT(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{t('cartDelivery')}</span>
              <span>{shipping ? formatBDT(shipping) : t('cartFree')}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-[14px] pt-1">
              <span>{t('cartTotal')}</span>
              <span>{formatBDT(total)}</span>
            </div>
          </div>

          <div
            className="mt-3 rounded-lg px-3 py-2 text-[12px] flex items-center gap-2"
            style={{ background: `${accent}12`, color: accent }}
          >
            <Icon name="cod" className="w-4 h-4" />
            {t('cartCODSelected')}
          </div>

          <button
            onClick={onPlace}
            disabled={placing || cart.length === 0}
            className="btn-primary w-full mt-3 text-[13px] font-semibold py-2.5 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {placing && (
              <span className="spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
            )}
            {placing ? t('cartPlacing') : t('cartPlaceCOD')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
