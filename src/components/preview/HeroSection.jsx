import Icon from '../Icon.jsx';
import { useT } from '../../lang/LangContext.jsx';

const HeroSection = ({ accent }) => {
  const t = useT();
  return (
    <section
      className="section-in relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}1A 0%, ${accent}0A 60%, transparent 100%), #ffffff`,
      }}
    >
      <div className="px-5 py-7 md:px-8 md:py-10 grid md:grid-cols-2 gap-5 items-center">
        <div>
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}1A`, color: accent }}
          >
            <Icon name="sparkles" className="w-3 h-3" stroke={2.2} />
            {t('heroBadgeCOD')}
          </div>
          <h1 className="font-display text-2xl md:text-[34px] leading-tight font-extrabold mt-3 text-gray-900">
            {t('heroTitle1Store')}
            <span className="block" style={{ color: accent }}>
              {t('heroTitle2Store')}
            </span>
          </h1>
          <p className="text-gray-600 text-[13.5px] md:text-sm mt-2 max-w-md">
            {t('heroDescStore')}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button className="btn-primary text-[13px] font-semibold px-4 py-2.5 rounded-lg">
              {t('heroBuyNow')}
            </button>
            <button
              className="text-[13px] font-semibold px-4 py-2.5 rounded-lg border"
              style={{ color: accent, borderColor: `${accent}55` }}
            >
              {t('heroHowItWorks')}
            </button>
          </div>
          <div className="flex items-center gap-4 mt-4 text-[12px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <Icon name="truck" className="w-4 h-4" />
              {t('heroFastDelivery')}
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="check" className="w-4 h-4" />
              {t('heroEasyReturn')}
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-[22px] blur-2xl opacity-40"
            style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
          />
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
            alt="hero"
            className="relative w-full h-44 md:h-60 object-cover rounded-2xl shadow-xl floaty"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
