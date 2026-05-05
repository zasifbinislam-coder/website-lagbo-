import { useState } from 'react';
import { QA_ITEMS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const QA = ({ accent }) => {
  const [open, setOpen] = useState(0);
  const t = useT();
  const tr = useTr();

  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#fafafa' }}
    >
      <div className="text-center mb-5">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('qaBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('qaTitle')}
        </h2>
        <p className="text-[12.5px] text-gray-500 mt-1">
          {t('qaSubtitle')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-2.5">
        {QA_ITEMS.map((it, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all"
              style={isOpen ? { borderColor: `${accent}66`, boxShadow: `0 8px 24px -16px ${accent}` } : undefined}
            >
              {/* Question */}
              <button
                onClick={() => setOpen(isOpen ? -1 : idx)}
                className="w-full text-left p-3.5"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full grid place-items-center text-white text-[12px] font-extrabold"
                    style={{ background: accent }}
                  >
                    Q
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] md:text-[13.5px] font-bold text-gray-900 leading-snug">
                      {tr(it, 'q')}
                    </div>
                    <div className="text-[10.5px] text-gray-500 mt-0.5">
                      {t('qaAskedBy')} <span className="font-semibold text-gray-700">{tr(it, 'askedBy')}</span> · {tr(it, 'askedTime')}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-base font-bold transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: accent }}
                  >
                    ⌄
                  </span>
                </div>
              </button>

              {/* Answer */}
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div
                    className="px-3.5 pb-3.5 pt-1 flex items-start gap-2.5"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full grid place-items-center bg-emerald-500 text-white text-[12px] font-extrabold">
                      A
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[12.5px] leading-relaxed text-gray-800 px-3 py-2 rounded-lg"
                        style={{ background: '#ecfdf5' }}
                      >
                        {tr(it, 'answer')}
                      </div>
                      <div className="text-[10.5px] text-emerald-700 font-semibold mt-1">
                        {t('qaAnsweredBy')} {tr(it, 'answeredBy')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <button
          className="text-[12px] font-extrabold px-4 py-2 rounded-lg border"
          style={{ color: accent, borderColor: `${accent}55` }}
        >
          {t('qaAskBtn')}
        </button>
      </div>
    </section>
  );
};

export default QA;
