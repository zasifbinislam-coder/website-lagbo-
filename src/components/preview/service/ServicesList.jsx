import Icon from '../../Icon.jsx';
import { SERVICES } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const ServicesList = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('serviceListBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('serviceListHeading')}
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm transition-shadow"
          >
            <div
              className="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-2xl"
              style={{ background: `${accent}15` }}
            >
              {s.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="text-[13.5px] font-bold text-gray-900">{tr(s, 'name')}</div>
                <div className="text-[13.5px] font-extrabold whitespace-nowrap" style={{ color: accent }}>
                  {formatBDT(s.price)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                <Icon name="clock" className="w-3 h-3" />
                {tr(s, 'duration')}
              </div>
              <div className="text-[12px] text-gray-600 leading-snug mt-1">{tr(s, 'desc')}</div>
              <button
                className="mt-2 text-[11px] font-bold px-2.5 py-1 rounded-md text-white"
                style={{ background: accent }}
              >
                {t('serviceBookNow')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
