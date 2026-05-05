import { VIDEO_REVIEWS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const VideoTestimonials = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fff7ed 60%, #ffffff 100%)',
      }}
    >
      <div className="text-center mb-5">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('videoReviewsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('videoReviewsTitle')}
        </h2>
        <p className="text-[12.5px] text-gray-500 mt-1">
          {t('videoReviewsSubtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {VIDEO_REVIEWS.map((v) => (
          <div
            key={v.name}
            className="relative rounded-2xl overflow-hidden border border-gray-100 group cursor-pointer shadow-sm hover:shadow-lg transition-all"
          >
            <div className="relative" style={{ aspectRatio: '4/5' }}>
              <img loading="lazy" decoding="async"
                src={v.thumb}
                alt={tr(v, 'name')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Duration */}
              <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white tabular-nums">
                {tr(v, 'duration')}
              </span>

              {/* Play button */}
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full grid place-items-center text-white shadow-2xl group-hover:scale-110 transition-transform pulse-ring"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute left-3 right-3 bottom-3 text-white">
                <div className="text-[13px] font-bold leading-tight">{tr(v, 'name')}</div>
                <div className="text-[11px] opacity-90">{tr(v, 'city')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[11.5px] text-gray-500 mt-4">
        {t('videoReviewsFooter')}
      </div>
    </section>
  );
};

export default VideoTestimonials;
