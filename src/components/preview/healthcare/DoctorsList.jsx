import Icon from '../../Icon.jsx';
import { DOCTORS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const DoctorsList = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('healthcareDoctorsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('healthcareDoctorsHeading')}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DOCTORS.map((d) => (
          <div key={d.name} className="rounded-2xl border border-gray-100 bg-white p-3.5 text-center hover:shadow-md transition-shadow">
            <img loading="lazy" decoding="async" src={d.avatar} alt={tr(d, 'name')} className="w-20 h-20 rounded-full object-cover mx-auto" style={{ boxShadow: `0 0 0 4px ${accent}22` }} />
            <div className="text-[13px] font-bold text-gray-900 mt-2 leading-tight">{tr(d, 'name')}</div>
            <div className="text-[11px] font-semibold mt-0.5" style={{ color: accent }}>{tr(d, 'specialty')}</div>
            <div className="text-[10.5px] text-gray-500">{d.degree}</div>
            <div className="flex items-center justify-center gap-1 mt-1.5 text-[10.5px] text-gray-600">
              <Icon name="star" className="w-3 h-3 text-amber-500" /> {d.rating} · {tr(d, 'exp')}
            </div>
            <div className="text-[11.5px] font-bold text-gray-800 mt-1.5">{t('healthcareFeeLabel')} {formatBDT(d.fee)}</div>
            <button className="w-full mt-2 text-[11px] font-bold py-1.5 rounded-md text-white" style={{ background: accent }}>
              {t('healthcareApptBtn')}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsList;
