import { HEALTHCARE_SERVICES } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const HealthServices = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#f0f9ff' }}>
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('healthcareServicesBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('healthcareServicesHeading')}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {HEALTHCARE_SERVICES.map((s) => (
          <div key={s.name} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-blue-100">
            <div className="shrink-0 w-10 h-10 rounded-lg grid place-items-center text-2xl" style={{ background: `${accent}15` }}>
              {s.emoji}
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-bold text-gray-900">{tr(s, 'name')}</div>
              <div className="text-[11px] text-gray-600 leading-snug mt-0.5">{tr(s, 'desc')}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthServices;
