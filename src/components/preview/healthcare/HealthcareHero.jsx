import Icon from '../../Icon.jsx';
import { HEALTHCARE_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const HealthcareHero = ({ accent }) => {
  const h = HEALTHCARE_INFO;
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in relative overflow-hidden">
      <div className="relative h-52 md:h-64">
        <img loading="lazy" decoding="async" src={h.hero} alt={tr(h, 'name')} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-5 md:px-10 py-5 text-white max-w-md">
          <div
            className="inline-flex items-center gap-1.5 self-start text-[10.5px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2"
            style={{ background: accent }}
          >
            ⭐ {h.rating} · {h.reviews}{t('healthcareTrustSuffix')}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold leading-tight">{tr(h, 'name')}</h1>
          <p className="text-[13px] md:text-sm opacity-95 mt-1">{tr(h, 'tagline')}</p>
          <div className="flex items-center gap-3 mt-3 text-[11.5px]">
            <span className="flex items-center gap-1"><Icon name="pin" className="w-3.5 h-3.5" />{tr(h, 'address')}</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-300"><Icon name="clock" className="w-3.5 h-3.5" />{tr(h, 'hours')}</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-bold px-4 py-2.5 rounded-lg">{t('healthcareBookAppt')}</button>
            <button className="text-[13px] font-bold px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur border border-white/30">{t('healthcareEmergency')}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareHero;
