import Icon from '../../Icon.jsx';
import { SERVICE_INFO } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const ServiceHero = ({ accent }) => {
  const s = SERVICE_INFO;
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}1A 0%, ${accent}08 60%, transparent 100%), #ffffff`,
      }}
    >
      <div className="px-5 md:px-8 py-7 md:py-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}1A`, color: accent }}
          >
            ⭐ {s.rating} · {s.reviews}+ {t('serviceReviewsSuffix')}
          </div>
          <h1 className="font-display text-2xl md:text-[34px] leading-tight font-extrabold mt-3 text-gray-900">
            {tr(s, 'name')}
          </h1>
          <div className="text-[13px] md:text-[14px] text-gray-500 -mt-0.5">{s.banglaName}</div>
          <p className="text-gray-600 text-[13.5px] md:text-sm mt-2 max-w-md">{tr(s, 'tagline')}</p>
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-bold px-4 py-2.5 rounded-lg">
              {t('serviceBookAppointment')}
            </button>
            <a
              href="tel:01XXXXXXXXX"
              onClick={(e) => e.preventDefault()}
              className="text-[13px] font-bold px-4 py-2.5 rounded-lg border flex items-center gap-1.5"
              style={{ color: accent, borderColor: `${accent}55` }}
            >
              <Icon name="phone" className="w-4 h-4" />
              {t('serviceCallNow')}
            </a>
          </div>
          <div className="flex items-center gap-4 mt-4 text-[12px] text-gray-600">
            <span className="flex items-center gap-1.5">
              <Icon name="pin" className="w-4 h-4" />
              {tr(s, 'address')}
            </span>
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-[22px] blur-2xl opacity-50"
            style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
          />
          <img loading="lazy" decoding="async"
            src={s.hero}
            alt="hero"
            className="relative w-full h-44 md:h-60 object-cover rounded-2xl shadow-xl floaty"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
