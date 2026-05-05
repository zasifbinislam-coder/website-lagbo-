import Icon from '../../Icon.jsx';
import { EDU_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const EducationHero = ({ accent }) => {
  const e = EDU_INFO;
  const t = useT();
  const tr = useTr();
  const tagline = tr(e, 'tagline');
  return (
    <section className="section-in relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}1A, ${accent}05 50%, transparent 100%), #ffffff` }}>
      <div className="px-5 md:px-8 py-7 md:py-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: `${accent}1A`, color: accent }}>
            <Icon name="sparkles" className="w-3 h-3" stroke={2.2} />
            ⭐ {e.rating} · {e.reviews}+ {t('eduHeroStudentsSuffix')}
          </div>
          <h1 className="font-display text-2xl md:text-[34px] leading-tight font-extrabold mt-3 text-gray-900">
            {tagline.split('·')[0]}
            <span className="block" style={{ color: accent }}>
              {t('eduHeroAccent')}
            </span>
          </h1>
          <p className="text-gray-600 text-[13.5px] md:text-sm mt-2 max-w-md">
            {t('eduHeroDesc')}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-bold px-4 py-2.5 rounded-lg">{t('eduViewCourses')}</button>
            <button className="text-[13px] font-bold px-4 py-2.5 rounded-lg border" style={{ color: accent, borderColor: `${accent}55` }}>{t('eduFreeClass')}</button>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5 max-w-sm">
            {[
              { v: t('eduStatStudents'), l: t('eduStatStudentsLabel') },
              { v: t('eduStatCourses'), l: t('eduStatCoursesLabel') },
              { v: t('eduStatSatisfaction'), l: t('eduStatSatisfactionLabel') },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-base font-extrabold" style={{ color: accent }}>{s.v}</div>
                <div className="text-[10.5px] text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-[22px] blur-2xl opacity-40" style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }} />
          <img loading="lazy" decoding="async" src={e.hero} className="relative w-full h-44 md:h-60 object-cover rounded-2xl shadow-xl floaty" />
        </div>
      </div>
    </section>
  );
};

export default EducationHero;
