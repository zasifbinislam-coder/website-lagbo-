import { useState } from 'react';
import { FAQ_ITEMS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const FAQ = ({ accent }) => {
  const [open, setOpen] = useState(0);
  const t = useT();
  const tr = useTr();

  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-5">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('faqBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('faqTitle')}
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-2">
        {FAQ_ITEMS.map((it, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 overflow-hidden transition-all"
              style={isOpen ? { borderColor: `${accent}55` } : undefined}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : idx)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
              >
                <span
                  className="shrink-0 w-7 h-7 rounded-full grid place-items-center text-[13px] font-extrabold"
                  style={{
                    background: isOpen ? accent : `${accent}18`,
                    color: isOpen ? '#fff' : accent,
                  }}
                >
                  {idx + 1}
                </span>
                <span className="flex-1 text-[13px] md:text-[13.5px] font-bold text-gray-900">
                  {tr(it, 'q')}
                </span>
                <span
                  className={`shrink-0 text-lg font-bold transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                  style={{ color: accent }}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-3 pl-14 text-[12.5px] leading-relaxed text-gray-700">
                    {tr(it, 'a')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
