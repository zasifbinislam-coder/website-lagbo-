import { useState } from 'react';
import { SPIN_PRIZES } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const SpinToWin = ({ accent }) => {
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winIdx, setWinIdx] = useState(null);
  const t = useT();
  const tr = useTr();

  const sectorDeg = 360 / SPIN_PRIZES.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinIdx(null);
    const target = Math.floor(Math.random() * SPIN_PRIZES.length);
    const fullTurns = 5 + Math.floor(Math.random() * 3);
    const final = fullTurns * 360 + (360 - (target * sectorDeg + sectorDeg / 2));
    setAngle((prev) => prev + final);
    setTimeout(() => {
      setWinIdx(target);
      setSpinning(false);
    }, 4500);
  };

  const conic = SPIN_PRIZES.map((p, i) => {
    const start = i * sectorDeg;
    const end = (i + 1) * sectorDeg;
    return `${p.color} ${start}deg ${end}deg`;
  }).join(', ');

  return (
    <>
      {/* Trigger ribbon at left edge of preview */}
      <button
        onClick={() => setOpen(true)}
        className="absolute left-0 top-1/3 z-30 origin-left rotate-90 -translate-x-[calc(100%-32px)] text-[11px] font-extrabold px-3 py-1.5 rounded-b-lg text-white shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`,
        }}
      >
        {t('spinTrigger')}
      </button>

      {/* Modal */}
      {open && (
        <div
          className="absolute inset-0 z-40 grid place-items-center p-3 backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={() => !spinning && setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-white shadow-2xl slide-up"
          >
            <button
              onClick={() => !spinning && setOpen(false)}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/50 text-white text-base grid place-items-center hover:bg-black/70"
            >
              ×
            </button>
            <div
              className="px-4 pt-4 pb-2 text-center text-white"
              style={{
                background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #ec4899))`,
              }}
            >
              <div className="text-[11px] font-extrabold tracking-wider opacity-90">{t('spinHeader')}</div>
              <h3 className="font-display text-lg font-extrabold mt-1">
                {t('spinTitle')}
              </h3>
              <p className="text-[12px] opacity-90 mt-0.5">
                {t('spinSubtitle')}
              </p>
            </div>

            <div className="p-5 grid place-items-center">
              <div className="relative">
                {/* Pointer */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-0 h-0"
                  style={{
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: `18px solid ${accent}`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  }}
                />

                {/* Wheel */}
                <div
                  className="w-56 h-56 rounded-full border-[6px] border-white shadow-xl relative"
                  style={{
                    background: `conic-gradient(${conic})`,
                    transform: `rotate(${angle}deg)`,
                    transition: 'transform 4.4s cubic-bezier(0.17, 0.67, 0.16, 0.99)',
                    boxShadow: `0 0 0 4px ${accent}33, 0 18px 40px -10px rgba(0,0,0,0.5)`,
                  }}
                >
                  {SPIN_PRIZES.map((p, i) => {
                    const a = i * sectorDeg + sectorDeg / 2;
                    return (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2 origin-[0_0] text-white text-[10.5px] font-extrabold whitespace-nowrap pointer-events-none"
                        style={{
                          transform: `rotate(${a}deg) translateY(-78px) translateX(-50%) rotate(90deg)`,
                          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        }}
                      >
                        {tr(p, 'label')}
                      </div>
                    );
                  })}
                </div>

                {/* Center hub */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full grid place-items-center text-white font-extrabold border-4 border-white shadow-md"
                  style={{ background: accent }}
                >
                  🎯
                </div>
              </div>

              {winIdx !== null && (
                <div
                  className="mt-3 px-3 py-2 rounded-lg text-center font-extrabold text-[13px]"
                  style={{ background: `${accent}15`, color: accent }}
                >
                  {t('spinWinPrefix')} {tr(SPIN_PRIZES[winIdx], 'label')}
                </div>
              )}

              <button
                onClick={spin}
                disabled={spinning}
                className="btn-primary w-full mt-4 text-[13px] font-extrabold py-2.5 rounded-lg disabled:opacity-60"
              >
                {spinning ? t('spinSpinning') : winIdx !== null ? t('spinAgain') : t('spinNow')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinToWin;
