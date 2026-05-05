import Icon from '../../Icon.jsx';
import { TRUST_BADGES } from '../../../data/content.js';
import { useTr } from '../../../lang/LangContext.jsx';

const TrustBadges = ({ accent }) => {
  const tr = useTr();
  return (
    <section className="section-in py-3 md:py-4 px-3 md:px-8 border-y border-gray-100 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {TRUST_BADGES.map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100"
          >
            <span
              className="w-8 h-8 rounded-full grid place-items-center shrink-0"
              style={{ background: `${accent}18`, color: accent }}
            >
              <Icon name={b.icon} className="w-4 h-4" stroke={2.2} />
            </span>
            <span className="text-[12px] md:text-[13px] font-semibold text-gray-800 leading-tight">
              {tr(b, 'label')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
