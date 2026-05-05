import Icon from '../../Icon.jsx';
import { useT } from '../../../lang/LangContext.jsx';

const AppDownload = ({ accent }) => {
  const t = useT();
  return (
    <section
      className="section-in px-4 md:px-8 py-6"
      style={{
        background: `linear-gradient(135deg, ${accent}1A, ${accent}05)`,
      }}
    >
      <div
        className="rounded-2xl overflow-hidden grid md:grid-cols-2 items-center text-white"
        style={{
          background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))`,
        }}
      >
        <div className="p-5 md:p-7">
          <div className="text-[11px] font-extrabold tracking-wider opacity-90">{t('marketplaceAppBadge')}</div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold mt-1.5">
            {t('marketplaceAppHeading')}
          </h2>
          <p className="text-[12.5px] opacity-90 mt-1.5 max-w-md">
            {t('marketplaceAppDesc')}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-black text-white text-[11px] font-bold px-3 py-2 rounded-lg"
            >
              <span className="text-xl"></span>
              <div>
                <div className="text-[9px] opacity-80 leading-none">Download on the</div>
                <div className="text-[12px] leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-black text-white text-[11px] font-bold px-3 py-2 rounded-lg"
            >
              <span className="text-base">▶</span>
              <div>
                <div className="text-[9px] opacity-80 leading-none">Get it on</div>
                <div className="text-[12px] leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <div className="p-5 md:p-7 grid place-items-center">
          <div className="bg-white p-3 rounded-xl shadow-md">
            {/* Decorative QR code */}
            <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" fill="#fff" />
              {Array.from({ length: 200 }).map((_, i) => {
                const x = (i % 14) * 8 + 4;
                const y = Math.floor(i / 14) * 8 + 4;
                const on = (i * 7919) % 100 < 48;
                return on ? <rect key={i} x={x} y={y} width="6" height="6" fill="#111" /> : null;
              })}
              {/* corner squares */}
              {[
                [4, 4],
                [88, 4],
                [4, 88],
              ].map(([x, y], i) => (
                <g key={i}>
                  <rect x={x} y={y} width="28" height="28" fill="#111" />
                  <rect x={x + 4} y={y + 4} width="20" height="20" fill="#fff" />
                  <rect x={x + 8} y={y + 8} width="12" height="12" fill="#111" />
                </g>
              ))}
            </svg>
          </div>
          <div className="text-[11px] font-bold mt-2 opacity-90">{t('marketplaceAppScan')}</div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
