import Icon from '../Icon.jsx';
import { TESTIMONIALS } from '../../data/content.js';
import { useT, useTr } from '../../lang/LangContext.jsx';

const Testimonials = () => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#fff' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-lg md:text-xl font-bold text-gray-900">
            {t('testimonialsHeading')}
          </h2>
          <p className="text-[12.5px] text-gray-500">{t('testimonialsSub')}</p>
        </div>
        <div className="hidden md:flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="star" className="w-4 h-4" />
          ))}
          <span className="text-[12px] text-gray-500 ml-1">{t('testimonialsRating')}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {TESTIMONIALS.map((tm) => (
          <div
            key={tm.name}
            className="rounded-xl border border-gray-100 p-3.5 bg-gradient-to-b from-white to-gray-50"
          >
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="w-3.5 h-3.5" />
              ))}
            </div>
            <p className="text-[12.5px] text-gray-700 leading-relaxed">"{tr(tm, 'text')}"</p>
            <div className="flex items-center gap-2 mt-3">
              <img loading="lazy" decoding="async" src={tm.avatar} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <div className="text-[12.5px] font-semibold text-gray-900">{tr(tm, 'name')}</div>
                <div className="text-[11px] text-gray-500">{tr(tm, 'city')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
