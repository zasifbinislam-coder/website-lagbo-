import { useState } from 'react';
import Icon from '../../Icon.jsx';
import { SERVICES } from '../../../data/content.js';
import { useLang, useT, useTr } from '../../../lang/LangContext.jsx';

const SLOTS_BN = ['১০:০০', '১১:০০', '১২:০০', '০২:০০', '০৩:০০', '০৪:০০', '০৫:০০', '০৬:০০'];
const SLOTS_EN = ['10:00', '11:00', '12:00', '02:00', '03:00', '04:00', '05:00', '06:00'];

const BookingForm = ({ accent }) => {
  const lang = useLang();
  const t = useT();
  const tr = useTr();
  const slots = lang === 'en' ? SLOTS_EN : SLOTS_BN;
  const [slot, setSlot] = useState(slots[1]);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);

  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#fafafa' }}
    >
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md text-white"
          style={{ background: accent }}
        >
          {t('bookingBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('bookingHeading')}
        </h2>
      </div>

      <form
        className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('bookingLabelService')}</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 bg-white"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {tr(s, 'name')} — {tr(s, 'duration')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('bookingLabelDate')}</label>
            <input
              type="date"
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('bookingLabelName')}</label>
            <input
              placeholder={t('bookingNamePlaceholder')}
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('bookingLabelPhone')}</label>
            <input
              placeholder="01XXXXXXXXX"
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-600 mb-2">{t('bookingLabelSlots')}</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {slots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSlot(time)}
                className={`text-[12px] font-bold py-2.5 rounded-lg border transition-all ${
                  slot === time
                    ? 'text-white border-transparent'
                    : 'text-gray-700 border-gray-200 bg-white hover:bg-gray-50'
                }`}
                style={slot === time ? { background: accent } : undefined}
              >
                {time}
              </button>
            ))}
          </div>

          <div
            className="mt-4 rounded-lg px-3 py-2.5 text-[12.5px] flex items-center gap-2"
            style={{ background: `${accent}12`, color: accent }}
          >
            <Icon name="check" className="w-4 h-4" stroke={2.4} />
            {t('bookingConfirmNote')}
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-3 text-[13px] font-extrabold py-3 rounded-lg"
          >
            {t('bookingSubmit')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookingForm;
