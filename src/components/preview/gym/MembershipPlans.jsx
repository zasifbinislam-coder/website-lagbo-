import Icon from '../../Icon.jsx';
import { GYM_PLANS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const MembershipPlans = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#fafafa' }}>
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('gymPlansBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('gymPlansHeading')}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {GYM_PLANS.map((p) => {
          const popular = p.popular;
          const name = tr(p, 'name');
          const features = tr(p, 'features') || [];
          return (
            <div key={p.name} className={`relative rounded-2xl border p-4 ${popular ? 'border-transparent text-white' : 'border-gray-200 bg-white'}`} style={popular ? { background: `linear-gradient(180deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`, boxShadow: `0 16px 40px -16px ${accent}` } : undefined}>
              {popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-gray-900 shadow">{t('gymPlansMostPopular')}</span>}
              <div className={`text-[11px] font-extrabold tracking-wider ${popular ? 'opacity-90' : 'text-gray-500'}`}>{name.toUpperCase()}</div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-3xl font-extrabold">{formatBDT(p.price)}</span>
                <span className={`text-[12px] ${popular ? 'opacity-80' : 'text-gray-500'}`}>/ {tr(p, 'period')}</span>
              </div>
              <ul className={`mt-3 space-y-1.5 text-[12.5px] ${popular ? '' : 'text-gray-700'}`}>
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Icon name="check" className="w-3.5 h-3.5" stroke={2.6} />{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-4 text-[12.5px] font-extrabold py-2.5 rounded-lg ${popular ? 'bg-white text-gray-900 hover:bg-gray-100' : 'btn-primary'}`}>
                {t('gymJoinNow')}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MembershipPlans;
