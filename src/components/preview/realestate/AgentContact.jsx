import Icon from '../../Icon.jsx';
import { AGENT } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const AgentContact = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#fafafa' }}>
      <div className="rounded-2xl overflow-hidden grid md:grid-cols-2 max-w-4xl mx-auto bg-white border border-gray-100 shadow-sm">
        <div className="p-5 md:p-6 text-white" style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))` }}>
          <div className="flex items-center gap-3">
            <img loading="lazy" decoding="async" src={AGENT.avatar} className="w-16 h-16 rounded-full object-cover border-4 border-white/30" />
            <div>
              <div className="text-[11px] font-bold tracking-wider opacity-90">{t('realEstateAgentLabel')}</div>
              <div className="text-lg font-extrabold leading-tight">{tr(AGENT, 'name')}</div>
              <div className="text-[12px] opacity-90">{tr(AGENT, 'role')}</div>
            </div>
          </div>
          <div className="mt-3 text-[12.5px] opacity-90">
            <div className="flex items-center gap-2 mt-1.5"><Icon name="check" className="w-3.5 h-3.5" stroke={3} />{tr(AGENT, 'exp')} {t('realEstateAgentExpSuffix')}</div>
            <div className="flex items-center gap-2 mt-1.5"><Icon name="check" className="w-3.5 h-3.5" stroke={3} />{t('realEstateAgentDeals')}</div>
            <div className="flex items-center gap-2 mt-1.5"><Icon name="check" className="w-3.5 h-3.5" stroke={3} />{t('realEstateAgentRating')}</div>
          </div>
        </div>
        <div className="p-5 md:p-6 bg-white">
          <div className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">{t('realEstateContactDirect')}</div>
          <h3 className="font-display text-xl font-extrabold text-gray-900 mt-1">{t('realEstateVisitProp')}</h3>
          <p className="text-[12.5px] text-gray-600 mt-1">{t('realEstateContactDesc')}</p>
          <div className="mt-3 space-y-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 text-[13px] font-bold text-gray-800 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
              <Icon name="phone" className="w-4 h-4" style={{ color: accent }} />{AGENT.phone}
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 text-[13px] font-bold text-gray-800 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
              <Icon name="mail" className="w-4 h-4" style={{ color: accent }} />{AGENT.email}
            </a>
          </div>
          <button className="btn-primary w-full mt-3 text-[13px] font-extrabold py-2.5 rounded-lg">{t('realEstateScheduleVisit')}</button>
        </div>
      </div>
    </section>
  );
};

export default AgentContact;
