import { useState } from 'react';
import Icon from '../../Icon.jsx';
import { useLang, useT } from '../../../lang/LangContext.jsx';

const ReservationForm = ({ accent }) => {
  const lang = useLang();
  const t = useT();
  const [people, setPeople] = useState(2);
  const timeSlots =
    lang === 'en'
      ? ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']
      : ['৭:০০ PM', '৭:৩০ PM', '৮:০০ PM', '৮:৩০ PM', '৯:০০ PM'];
  const benefits = [
    t('restaurantBenefitFree'),
    t('restaurantBenefitConfirm'),
    t('restaurantBenefitCancel'),
  ];
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="rounded-2xl border border-gray-100 overflow-hidden grid md:grid-cols-2">
        <div
          className="relative p-6 md:p-7 text-white"
          style={{
            background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`,
          }}
        >
          <div className="text-[11px] font-extrabold tracking-wider opacity-90">{t('restaurantReservationTitle')}</div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold mt-1">
            {t('restaurantReservationHeading')}
          </h2>
          <p className="text-[12.5px] md:text-[13px] mt-1.5 opacity-90 max-w-xs">
            {t('restaurantReservationDesc')}
          </p>
          <ul className="mt-4 space-y-1.5 text-[12.5px]">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Icon name="check" className="w-3.5 h-3.5" stroke={3} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <form
          className="p-5 md:p-6 bg-white space-y-2.5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('restaurantLabelDate')}</label>
              <input
                type="date"
                className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('restaurantLabelTime')}</label>
              <select className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 bg-white">
                {timeSlots.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('restaurantLabelGuests')}</label>
            <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="w-9 h-9 text-lg font-bold text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-12 text-center text-[13.5px] font-bold text-gray-900">
                {people}
              </span>
              <button
                type="button"
                onClick={() => setPeople((p) => Math.min(20, p + 1))}
                className="w-9 h-9 text-lg font-bold text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
              <span className="text-[12px] text-gray-500 px-2">{t('restaurantLabelGuestsUnit')}</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('restaurantLabelName')}</label>
            <input
              placeholder={t('restaurantNamePlaceholder')}
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('restaurantLabelPhone')}</label>
            <input
              placeholder="01XXXXXXXXX"
              className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full mt-2 text-[13px] font-extrabold py-2.5 rounded-lg"
          >
            {t('restaurantBookTable')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;
