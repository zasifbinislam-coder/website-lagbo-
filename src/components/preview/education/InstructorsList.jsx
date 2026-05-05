import { INSTRUCTORS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const InstructorsList = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#fafafa' }}>
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('eduInstructorsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('eduInstructorsHeading')}</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
        {INSTRUCTORS.map((i) => (
          <div key={i.name} className="rounded-2xl bg-white border border-gray-100 p-4 text-center">
            <img loading="lazy" decoding="async" src={i.avatar} className="w-20 h-20 rounded-full object-cover mx-auto" style={{ boxShadow: `0 0 0 4px ${accent}22` }} />
            <div className="text-[13px] font-bold text-gray-900 mt-2.5">{tr(i, 'name')}</div>
            <div className="text-[11px] font-semibold mt-0.5" style={{ color: accent }}>{tr(i, 'expertise')}</div>
            <div className="text-[10.5px] text-gray-500 mt-0.5">{tr(i, 'students')} {t('eduStudentsLabel')}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstructorsList;
