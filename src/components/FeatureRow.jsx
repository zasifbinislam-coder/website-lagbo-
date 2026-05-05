import Icon from './Icon.jsx';
import Toggle from './Toggle.jsx';

const FeatureRow = ({ icon, title, desc, on, onChange }) => (
  <label className="feature-row flex items-start gap-3 p-3 rounded-xl border border-white/[0.06] cursor-pointer">
    <div
      className={`mt-0.5 grid place-items-center w-9 h-9 rounded-lg border border-white/10 ${
        on ? 'text-white' : 'text-white/60'
      }`}
      style={{
        background: on
          ? 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))'
          : 'rgba(255,255,255,0.03)',
        boxShadow: on ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <Icon name={icon} className="w-[18px] h-[18px]" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium text-white/90 text-[14.5px] truncate">{title}</div>
        <Toggle on={on} onChange={onChange} />
      </div>
      <div className="text-[12.5px] text-white/55 leading-snug mt-0.5">{desc}</div>
    </div>
  </label>
);

export default FeatureRow;
