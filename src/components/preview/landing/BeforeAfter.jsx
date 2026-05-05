import { useRef, useState } from 'react';
import { BEFORE_AFTER } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const BeforeAfter = ({ accent }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);
  const t = useT();
  const tr = useTr();

  const updateFromClientX = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const onDown = (e) => {
    dragging.current = true;
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    updateFromClientX(clientX);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    updateFromClientX(clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('beforeAfterBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {tr(BEFORE_AFTER, 'caption')}
        </h2>
        <p className="text-[12.5px] text-gray-500 mt-1">{t('beforeAfterHint')}</p>
      </div>

      <div
        ref={ref}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
        className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-200 select-none cursor-ew-resize"
        style={{ aspectRatio: '16/10' }}
      >
        {/* After image (full) */}
        <img loading="lazy" decoding="async"
          src={BEFORE_AFTER.after}
          alt={t('beforeAfterAfterAlt')}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute top-2 right-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-600 text-white">
          {tr(BEFORE_AFTER, 'afterLabel')}
        </span>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img loading="lazy" decoding="async"
            src={BEFORE_AFTER.before}
            alt={t('beforeAfterBeforeAlt')}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <span
          className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-gray-900/80 text-white"
          style={{ opacity: pos > 6 ? 1 : 0 }}
        >
          {tr(BEFORE_AFTER, 'beforeLabel')}
        </span>

        {/* Divider + handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/90 pointer-events-none"
          style={{ left: `${pos}%`, boxShadow: '0 0 12px rgba(0,0,0,0.4)' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white grid place-items-center pointer-events-none shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <span className="text-gray-700 text-[14px] font-extrabold">⇆</span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
