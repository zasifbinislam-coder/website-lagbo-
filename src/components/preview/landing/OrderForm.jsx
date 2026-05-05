import { useState } from 'react';
import Icon from '../../Icon.jsx';
import { LANDING_PRODUCT } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const OrderForm = ({ accent, onPlace, placing }) => {
  const [qty, setQty] = useState(1);
  const t = useT();
  const tr = useTr();
  const p = LANDING_PRODUCT;
  const subtotal = p.price * qty;
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlace();
  };

  return (
    <section
      id="order-form"
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#fafafa' }}
    >
      <div className="text-center mb-5">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md text-white"
          style={{ background: accent }}
        >
          {t('orderFormBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('orderFormTitle')}
        </h2>
        <p className="text-[12.5px] md:text-[13.5px] text-gray-500 mt-1">
          {t('orderFormSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-4">
        {/* Form fields */}
        <div className="md:col-span-3 space-y-2.5">
          <div>
            <label className="block text-[11.5px] font-bold text-gray-700 mb-1">
              {t('orderFormName')} <span className="text-red-500">*</span>
            </label>
            <input
              required
              placeholder={t('orderFormNamePlaceholder')}
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-[11.5px] font-bold text-gray-700 mb-1">
              {t('orderFormPhone')} <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="tel"
              placeholder="01XXXXXXXXX"
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-[11.5px] font-bold text-gray-700 mb-1">
              {t('orderFormAddress')} <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows="2"
              placeholder={t('orderFormAddressPlaceholder')}
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-[11.5px] font-bold text-gray-700 mb-1">
              {t('orderFormQuantity')}
            </label>
            <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-lg font-bold text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-10 text-center text-[13.5px] font-bold text-gray-900">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="w-9 h-9 text-lg font-bold text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="md:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-3.5 sticky top-3">
            <div className="text-[12.5px] font-bold text-gray-800 mb-2">{t('orderFormYourOrder')}</div>

            <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-100">
              <img loading="lazy" decoding="async" src={p.gallery[0]} className="w-12 h-12 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-semibold text-gray-900 truncate">{tr(p, 'name')}</div>
                <div className="text-[11px] text-gray-500">
                  {t('orderFormQtyShort')} {qty} · {formatBDT(p.price)}
                </div>
              </div>
              <div className="text-[12.5px] font-bold text-gray-900">{formatBDT(subtotal)}</div>
            </div>

            <div className="space-y-1 mt-2.5 text-[12.5px]">
              <div className="flex justify-between text-gray-600">
                <span>{t('orderFormSubtotal')}</span>
                <span>{formatBDT(subtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{t('orderFormDelivery')}</span>
                <span>{t('orderFormFree')}</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-[15px] pt-1.5 border-t border-gray-100 mt-1.5">
                <span>{t('orderFormTotal')}</span>
                <span style={{ color: accent }}>{formatBDT(total)}</span>
              </div>
            </div>

            <div
              className="mt-3 rounded-lg px-3 py-2 text-[12px] flex items-center gap-2"
              style={{ background: `${accent}12`, color: accent }}
            >
              <Icon name="cod" className="w-4 h-4" />
              {t('orderFormCodHint')}
            </div>

            <button
              type="submit"
              disabled={placing}
              className="btn-primary w-full mt-3 text-[13.5px] font-extrabold py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {placing && (
                <span className="spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
              )}
              {placing ? t('orderFormPlacing') : t('orderFormConfirm')}
            </button>

            <div className="text-[10.5px] text-gray-500 text-center mt-2">
              {t('orderFormTerms')}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default OrderForm;
