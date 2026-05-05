import { TEAM } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const TeamSection = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#fafafa' }}
    >
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('teamBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('teamHeading')}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="rounded-2xl bg-white border border-gray-100 p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="relative inline-block">
              <img loading="lazy" decoding="async"
                src={member.avatar}
                alt={tr(member, 'name')}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto"
                style={{ boxShadow: `0 0 0 4px ${accent}22` }}
              />
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9.5px] font-extrabold px-2 py-0.5 rounded-full text-white whitespace-nowrap"
                style={{ background: accent }}
              >
                {tr(member, 'exp')}
              </span>
            </div>
            <div className="text-[13.5px] font-bold text-gray-900 mt-3">{tr(member, 'name')}</div>
            <div className="text-[11.5px] text-gray-500">{tr(member, 'role')}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
