import { GYM_CLASSES } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const ClassSchedule = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('gymScheduleBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('gymScheduleHeading')}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {GYM_CLASSES.map((c) => (
          <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm transition-shadow">
            <div className="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-2xl" style={{ background: `${accent}15` }}>
              {c.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-gray-900">{tr(c, 'name')}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">⏰ {tr(c, 'time')}</div>
              <div className="text-[11px] text-gray-500">📅 {tr(c, 'day')} · 👨‍🏫 {tr(c, 'trainer')}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>{t('gymEmptySpots')}</div>
              <div className="text-base font-extrabold text-gray-900">{c.spots}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClassSchedule;
