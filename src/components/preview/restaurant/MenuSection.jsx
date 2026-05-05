import { useState } from 'react';
import Icon from '../../Icon.jsx';
import { MENU, MENU_CATEGORIES, MENU_CATEGORIES_EN } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useLang, useT, useTr } from '../../../lang/LangContext.jsx';

const MenuSection = ({ accent }) => {
  const lang = useLang();
  const t = useT();
  const tr = useTr();
  const allLabel = t('menuAll');
  const [cat, setCat] = useState(allLabel);
  const categories = lang === 'en' ? MENU_CATEGORIES_EN : MENU_CATEGORIES;
  const cats = [allLabel, ...categories];
  const filtered =
    cat === allLabel
      ? MENU
      : MENU.filter((m) => (lang === 'en' ? m.cat_en === cat : m.cat === cat));

  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('menuBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('menuHeading')}
        </h2>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto nice-scroll pb-2 mb-3 -mx-5 md:mx-0 px-5 md:px-0">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
              cat === c
                ? 'text-white border-transparent'
                : 'text-gray-600 border-gray-200 bg-white hover:bg-gray-50'
            }`}
            style={cat === c ? { background: accent } : undefined}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-shadow"
          >
            <img loading="lazy" decoding="async"
              src={m.img}
              alt={tr(m, 'name')}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[13.5px] font-bold text-gray-900 flex items-center gap-1.5">
                    <span className="truncate">{tr(m, 'name')}</span>
                    {m.popular && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded text-white" style={{ background: accent }}>
                        {t('menuHot')}
                      </span>
                    )}
                  </div>
                  <div className="text-[11.5px] text-gray-500 leading-snug mt-0.5 line-clamp-2">
                    {tr(m, 'desc')}
                  </div>
                </div>
                <div className="text-[14px] font-extrabold whitespace-nowrap" style={{ color: accent }}>
                  {formatBDT(m.price)}
                </div>
              </div>
              <button
                className="mt-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border transition-colors"
                style={{ color: accent, borderColor: `${accent}55` }}
              >
                {t('menuAddToOrder')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
