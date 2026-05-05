import { FREE_GIFTS } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const FreeGifts = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{
        background: `linear-gradient(135deg, #fff7ed, #fef2f2)`,
      }}
    >
      <div className="text-center mb-5">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-red-100 text-red-700">
          {t('freeGiftsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('freeGiftsTitlePrefix')} {formatBDT(990)}
        </h2>
        <p className="text-[12.5px] md:text-[13.5px] text-gray-600 mt-1">
          {t('freeGiftsSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 md:gap-3">
        {FREE_GIFTS.map((g, i) => (
          <div
            key={g.name}
            className="relative rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm"
          >
            <span
              className="absolute top-2 left-2 z-10 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md text-white"
              style={{ background: accent }}
            >
              {t('freeGiftsLabel')}
            </span>
            <span className="absolute top-2 right-2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/70 text-white">
              #{i + 1}
            </span>
            <img loading="lazy" decoding="async" src={g.img} alt={tr(g, 'name')} className="w-full h-24 md:h-28 object-cover" />
            <div className="p-2">
              <div className="text-[11.5px] md:text-[12px] font-semibold text-gray-800 leading-tight line-clamp-2">
                {tr(g, 'name')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[11.5px] text-gray-500 mt-4">
        {t('freeGiftsFooter')}
      </div>
    </section>
  );
};

export default FreeGifts;
