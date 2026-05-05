import Icon from '../../Icon.jsx';
import { WHATSAPP_REVIEWS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const WhatsAppReviews = () => {
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{
        background:
          'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ffffff 100%)',
      }}
    >
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700">
          <Icon name="whatsapp" className="w-3.5 h-3.5" stroke={2.4} />
          {t('waReviewsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('waReviewsTitle')}
        </h2>
        <p className="text-[12.5px] md:text-[13.5px] text-gray-500 mt-1">
          {t('waReviewsSubtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {WHATSAPP_REVIEWS.map((r, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-emerald-100 bg-white shadow-sm overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(16,185,129,0.04), rgba(255,255,255,1))',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-emerald-600 text-white">
              <img loading="lazy" decoding="async" src={r.avatar} className="w-8 h-8 rounded-full object-cover border-2 border-white" />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-bold leading-none">{tr(r, 'name')}</div>
                <div className="text-[10.5px] opacity-90 mt-0.5">{t('waReviewsOnline')}</div>
              </div>
              <Icon name="whatsapp" className="w-4 h-4" />
            </div>

            {/* Bubble */}
            <div
              className="p-3"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 10% 0%, rgba(16,185,129,0.06), transparent 40%)',
              }}
            >
              {r.img && (
                <img loading="lazy" decoding="async"
                  src={r.img}
                  className="w-full h-32 object-cover rounded-lg mb-2 border border-emerald-100"
                />
              )}
              <div className="relative inline-block max-w-full bg-emerald-50 text-gray-800 text-[12.5px] leading-relaxed rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                {tr(r, 'msg')}
                <div className="text-[10px] text-gray-500 text-right mt-1 flex items-center justify-end gap-1">
                  {tr(r, 'time')}
                  <span className="text-emerald-500">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsAppReviews;
