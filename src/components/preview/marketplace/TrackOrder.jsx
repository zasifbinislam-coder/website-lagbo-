import Icon from '../../Icon.jsx';
import { useT } from '../../../lang/LangContext.jsx';

const TrackOrder = ({ accent }) => {
  const t = useT();
  return (
    <section className="section-in px-4 md:px-8 py-5 bg-white">
      <div
        className="rounded-2xl border p-4 md:p-5 flex flex-col md:flex-row items-stretch md:items-center gap-3"
        style={{
          background: 'linear-gradient(135deg, #ecfeff, #f0fdf4)',
          borderColor: '#a7f3d0',
        }}
      >
        <div
          className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
          style={{ background: `${accent}18`, color: accent }}
        >
          <Icon name="truck" className="w-5 h-5" stroke={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-extrabold text-gray-900">{t('marketplaceTrackHeading')}</div>
          <div className="text-[11.5px] text-gray-600">
            {t('marketplaceTrackDesc')}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            placeholder={t('marketplaceTrackPlaceholder')}
            className="flex-1 md:w-44 text-[12.5px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 bg-white"
          />
          <button
            className="text-[12px] font-extrabold px-4 py-2.5 rounded-lg text-white whitespace-nowrap"
            style={{ background: accent }}
          >
            {t('marketplaceTrackBtn')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
