import { useState } from 'react';
import Icon from '../../Icon.jsx';
import { DOCTORS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const AppointmentBooking = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  const SLOTS = [
    t('healthcareSlotMorning10'),
    t('healthcareSlotNoon12'),
    t('healthcareSlotAfternoon4'),
    t('healthcareSlotEvening6'),
    t('healthcareSlotNight8'),
  ];
  const [doc, setDoc] = useState(DOCTORS[0].name);
  const [slot, setSlot] = useState(SLOTS[2]);

  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md text-white" style={{ background: accent }}>
          {t('healthcareApptBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('healthcareApptHeading')}</h2>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('healthcarePickDoctor')}</label>
            <select value={doc} onChange={(e) => setDoc(e.target.value)} className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 bg-white">
              {DOCTORS.map((d) => <option key={d.name} value={d.name}>{tr(d, 'name')} — {tr(d, 'specialty')}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('healthcareDate')}</label>
            <input type="date" className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('healthcareYourName')}</label>
            <input placeholder={t('healthcarePatientPlaceholder')} className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">{t('healthcareMobile')}</label>
            <input placeholder="01XXXXXXXXX" className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-gray-600 mb-2">{t('healthcarePickTime')}</label>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)} className={`text-[12px] font-bold py-2.5 rounded-lg border transition-all ${slot === s ? 'text-white border-transparent' : 'text-gray-700 border-gray-200 bg-white'}`} style={slot === s ? { background: accent } : undefined}>
                {s}
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-lg px-3 py-2 text-[12px] flex items-center gap-2" style={{ background: `${accent}12`, color: accent }}>
            <Icon name="check" className="w-4 h-4" stroke={2.4} />
            {t('healthcareSmsConfirm')}
          </div>
          <button type="submit" className="btn-primary w-full mt-3 text-[13px] font-extrabold py-3 rounded-lg">
            {t('healthcareConfirmBtn')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentBooking;
