import { SPECIALS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const SpecialsSection = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{ background: 'linear-gradient(135deg, #fff7ed, #fef3c7)' }}
    >
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-red-100 text-red-700">
          {t('specialsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('specialsHeading')}
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {SPECIALS.map((s) => (
          <div
            key={s.name}
            className="relative rounded-2xl overflow-hidden bg-white border border-amber-100 shadow-sm"
          >
            <div className="relative">
              <img loading="lazy" decoding="async" src={s.img} className="w-full h-32 object-cover" />
              <span
                className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded text-white"
                style={{ background: accent }}
              >
                {tr(s, 'tag')}
              </span>
            </div>
            <div className="p-3">
              <div className="text-[13px] font-bold text-gray-900 leading-tight">{tr(s, 'name')}</div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-base font-extrabold" style={{ color: accent }}>
                  {formatBDT(s.price)}
                </span>
                <span className="text-[11.5px] text-gray-400 line-through">
                  {formatBDT(s.oldPrice)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialsSection;
