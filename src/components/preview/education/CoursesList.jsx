import Icon from '../../Icon.jsx';
import { COURSES } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr, useLang } from '../../../lang/LangContext.jsx';

const CoursesList = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  const lang = useLang();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('eduCoursesBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('eduCoursesHeading')}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {COURSES.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all">
            <div className="relative">
              <img loading="lazy" decoding="async" src={c.img} alt={tr(c, 'name')} className="w-full h-28 md:h-32 object-cover" />
              {c.tag && <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white" style={{ background: accent }}>{tr(c, 'tag')}</span>}
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 text-gray-700">{tr(c, 'level')}</span>
            </div>
            <div className="p-3">
              <div className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-1">{tr(c, 'name')}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">👨‍🏫 {tr(c, 'instructor')}</div>
              <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-gray-600">
                <span>⏱ {tr(c, 'duration')}</span>
                <span>👥 {lang === 'en' ? c.students.toLocaleString('en-IN') : c.students}+</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[14px] font-extrabold" style={{ color: accent }}>{formatBDT(c.price)}</span>
                  {c.oldPrice && <span className="text-[10.5px] text-gray-400 line-through">{formatBDT(c.oldPrice)}</span>}
                </div>
                <button className="text-[10.5px] font-bold px-2 py-1 rounded-md text-white" style={{ background: accent }}>{t('eduEnrollNow')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesList;
