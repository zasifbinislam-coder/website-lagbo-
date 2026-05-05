import Icon from './Icon.jsx';
import FeatureRow from './FeatureRow.jsx';
import SectionTitle from './SectionTitle.jsx';
import { COLOR_PALETTES, SITE_TYPES, getType, t, tr } from '../data/content.js';
import logo from '../assets/logo.png';

const LangToggle = ({ lang, onToggle }) => (
  <button
    onClick={onToggle}
    title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    className="shrink-0 inline-flex items-center text-[10.5px] font-bold rounded-md overflow-hidden border border-white/15 hover:border-white/30 bg-white/5"
  >
    <span className={`px-1.5 py-1 ${lang === 'bn' ? 'bg-white text-gray-900' : 'text-white/70'}`}>বাং</span>
    <span className={`px-1.5 py-1 ${lang === 'en' ? 'bg-white text-gray-900' : 'text-white/70'}`}>EN</span>
  </button>
);

const ConfigPanel = ({
  type,
  setType,
  features,
  setFeatures,
  accent,
  setAccent,
  onSetAllExtras,
  onReset,
  onGoHome,
  onGetQuote,
  lang = 'bn',
  onToggleLang,
  mobileVisible = true,
  onPreviewMobile,
}) => {
  const current = getType(type);
  const enabledExtras = current.extras.filter((e) => features[e.key]).length;
  const allOn = current.extras.length > 0 && current.extras.every((e) => features[e.key]);
  const setFeat = (key) => (val) => setFeatures((f) => ({ ...f, [key]: val }));

  return (
    <aside
      className={`${mobileVisible ? 'flex' : 'hidden'} md:flex md:w-[420px] lg:w-[460px] xl:w-[480px] shrink-0 h-full md:p-6 p-4 flex-col gap-4 overflow-hidden`}
    >
      {/* Mobile-only slim status bar: ← Home · current site type · active count
          (gives the user a permanent selection summary instead of dead chrome) */}
      <div className="md:hidden flex items-center gap-2 px-1">
        <button
          onClick={onGoHome}
          title={t(lang, 'goHomeTitle')}
          className="shrink-0 text-[12px] font-bold px-2.5 py-1.5 rounded-md border border-white/15 text-white/85 hover:bg-white/5 inline-flex items-center"
        >
          ← {t(lang, 'backHome').replace('← ', '')}
        </button>
        <div
          className="flex-1 min-w-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${accent}22, transparent)`,
            borderColor: `${accent}55`,
          }}
        >
          <span className="text-base shrink-0">{current.emoji}</span>
          <span className="text-[12px] font-bold text-white truncate">{tr(current, 'name', lang)}</span>
        </div>
        <div className="shrink-0 text-[11px] font-extrabold px-2 py-1.5 rounded-md border border-white/10 bg-white/[0.04] tabular-nums">
          <span className="text-emerald-300">{enabledExtras}</span>
          <span className="text-white/35">/{current.extras.length}</span>
        </div>
      </div>

      {/* Brand header — desktop only */}
      <div className="hidden md:flex glass-strong rounded-2xl p-4 items-center gap-3">
        <button
          onClick={onGoHome}
          title={t(lang, 'goHomeTitle')}
          className="shrink-0 hover:scale-105 transition-transform"
        >
          <img
            src={logo}
            alt="Website Lagbe? Logo"
            className="w-10 h-10 rounded-xl object-cover"
            style={{ boxShadow: `0 10px 30px -10px ${accent}` }}
          />
        </button>
        <div className="flex-1 min-w-0">
          <button
            onClick={onGoHome}
            className="font-display font-extrabold text-[17px] grad-text hover:opacity-80 transition-opacity"
            title={t(lang, 'goHomeTitle')}
          >
            {t(lang, 'brand')}
          </button>
          <div className="text-[11.5px] text-white/55 -mt-0.5">{t(lang, 'brandSubtitle')}</div>
        </div>
        <LangToggle lang={lang} onToggle={onToggleLang} />
        <button
          onClick={onGoHome}
          className="shrink-0 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all"
        >
          {t(lang, 'backHome')}
        </button>
      </div>

      {/* Active count strip — desktop only (mobile shows it in the slim status bar) */}
      <div className="hidden md:flex glass rounded-xl px-4 py-2 items-center gap-2 -mt-2">
        <span className="text-[12px] text-white/55">{t(lang, 'activeNow')}</span>
        <span className="text-[14px] font-extrabold text-white">
          {enabledExtras}
          <span className="text-white/40 font-medium">/{current.extras.length}</span>
        </span>
        <span className="text-[12px] text-white/55">{t(lang, 'extrasLabel')}</span>
      </div>

      {/* Scrollable config */}
      <div className="glass rounded-2xl p-4 flex-1 min-h-0 overflow-auto nice-scroll">
        {/* Site Type */}
        <SectionTitle>{t(lang, 'chooseSiteType')}</SectionTitle>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {SITE_TYPES.map((st) => {
            const active = type === st.key;
            return (
              <button
                key={st.key}
                onClick={() => setType(st.key)}
                className={`relative group text-left rounded-xl overflow-hidden border transition-all ${
                  active ? 'border-transparent' : 'border-white/10 hover:border-white/25'
                }`}
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${st.accent}, color-mix(in srgb, ${st.accent} 60%, #000))`
                    : 'rgba(255,255,255,0.03)',
                  boxShadow: active ? `0 12px 28px -10px ${st.accent}` : undefined,
                }}
              >
                <div className="relative h-16 overflow-hidden">
                  <img
                    src={st.sample}
                    alt={tr(st, 'name', lang)}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: active
                        ? `linear-gradient(180deg, transparent, ${st.accent}cc)`
                        : 'linear-gradient(180deg, transparent, rgba(11,15,26,0.85))',
                    }}
                  />
                  <span className="absolute top-1.5 left-1.5 text-base">{st.emoji}</span>
                  {active && (
                    <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/30 grid place-items-center backdrop-blur">
                      <Icon name="check" className="w-3 h-3 text-white" stroke={3} />
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <div
                    className={`font-bold text-[12.5px] leading-tight ${
                      active ? 'text-white' : 'text-white/90'
                    }`}
                  >
                    {tr(st, 'name', lang)}
                  </div>
                  <div
                    className={`text-[10.5px] leading-tight mt-0.5 ${
                      active ? 'text-white/85' : 'text-white/50'
                    }`}
                  >
                    {tr(st, 'tagline', lang)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Always Included */}
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
            {t(lang, 'alwaysIncluded')}
          </span>
        </SectionTitle>
        <div
          className="rounded-xl border p-2 mb-5"
          style={{
            background: 'linear-gradient(180deg, rgba(16,185,129,0.07), rgba(16,185,129,0.02))',
            borderColor: 'rgba(16,185,129,0.15)',
          }}
        >
          {current.essentials.map((e) => (
            <div key={e.key} className="flex items-center gap-2 px-2 py-1.5 text-[12.5px]">
              <span className="w-4 h-4 rounded-full grid place-items-center bg-emerald-500/20 text-emerald-300">
                <Icon name="check" className="w-3 h-3" stroke={3} />
              </span>
              <span className="text-white/85">{tr(e, 'label', lang)}</span>
              <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-emerald-400/80">
                {t(lang, 'builtIn')}
              </span>
            </div>
          ))}
          <div className="text-[10.5px] text-white/45 px-2 py-1 mt-1 border-t border-white/5">
            {t(lang, 'essentialsNote')}
          </div>
        </div>

        {/* Extras */}
        <SectionTitle>{t(lang, 'extraFeatures')}</SectionTitle>
        <div className="space-y-2">
          {current.extras.map((f) => (
            <FeatureRow
              key={f.key}
              icon={f.icon}
              title={tr(f, 'title', lang)}
              desc={tr(f, 'desc', lang)}
              on={!!features[f.key]}
              onChange={setFeat(f.key)}
            />
          ))}
        </div>

        {/* Theme palettes */}
        <div className="mt-5">
          <SectionTitle>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="palette" className="w-3.5 h-3.5" />
              {t(lang, 'themeColor')}
            </span>
          </SectionTitle>
          <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="grid grid-cols-4 gap-2">
              {COLOR_PALETTES.map((p) => {
                const active = accent === p.primary;
                const palName = tr(p, 'name', lang);
                return (
                  <button
                    key={p.name}
                    title={palName}
                    onClick={() => setAccent(p.primary)}
                    className={`group relative p-1.5 rounded-lg transition-all ${
                      active ? 'bg-white/15 ring-1 ring-white/40' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-center -space-x-2.5">
                      <span
                        className="w-6 h-6 rounded-full border-2 border-[#0b0f1a]"
                        style={{ background: p.tertiary, zIndex: 1 }}
                      />
                      <span
                        className="w-6 h-6 rounded-full border-2 border-[#0b0f1a]"
                        style={{ background: p.secondary, zIndex: 2 }}
                      />
                      <span
                        className="w-7 h-7 rounded-full border-2 border-[#0b0f1a]"
                        style={{ background: p.primary, zIndex: 3 }}
                      />
                    </div>
                    <div
                      className={`text-[9.5px] font-bold mt-1 truncate ${
                        active ? 'text-white' : 'text-white/55'
                      }`}
                    >
                      {palName}
                    </div>
                    {active && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white grid place-items-center">
                        <Icon name="check" className="w-2.5 h-2.5 text-gray-900" stroke={3.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <Icon name="palette" className="w-3.5 h-3.5 text-white/45" />
              <label className="text-[11.5px] text-white/55">{t(lang, 'custom')}</label>
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="ml-auto w-9 h-7 rounded-md bg-transparent border border-white/15 cursor-pointer"
              />
              <span className="text-[10.5px] tabular-nums text-white/45 font-mono">{accent}</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-5">
          <SectionTitle>{t(lang, 'quickActions')}</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSetAllExtras(!allOn)}
              className={`text-[12.5px] font-semibold py-2.5 rounded-lg border transition-all ${
                allOn
                  ? 'border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/15'
                  : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15'
              }`}
            >
              {allOn ? `🛑 ${t(lang, 'disableAllExtras')}` : `✨ ${t(lang, 'enableAllExtras')}`}
            </button>
            <button
              onClick={onReset}
              className="text-[12.5px] font-semibold py-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition-colors"
            >
              ↺ {t(lang, 'resetDefaults')}
            </button>
          </div>
          <div className="text-[10.5px] text-white/40 mt-1.5 px-1 leading-snug">
            {t(lang, 'resetHint')}
          </div>
        </div>
      </div>

      {/* CTA → goes to PricingPage with this selection pre-loaded. Desktop only;
          mobile uses the floating button on the preview side. */}
      <button
        onClick={onGetQuote}
        className="hidden md:flex glass-strong rounded-2xl p-4 items-center gap-3 text-left hover:bg-white/[0.04] transition-colors group"
      >
        <div className="flex-1">
          <div className="font-semibold text-[13.5px] text-white">{t(lang, 'ctaTitle')}</div>
          <div className="text-[12px] text-white/55">{t(lang, 'ctaSub')}</div>
        </div>
        <span className="btn-primary text-[12.5px] font-semibold px-3.5 py-2 rounded-lg whitespace-nowrap inline-flex items-center gap-1.5 group-hover:gap-2 transition-all">
          {t(lang, 'ctaButton')}
          <span>→</span>
        </span>
      </button>

      {/* Mobile-only Preview button at the bottom of ConfigPanel */}
      {onPreviewMobile && (
        <button
          onClick={onPreviewMobile}
          className="md:hidden btn-primary text-[14px] font-extrabold py-3 rounded-xl inline-flex items-center justify-center gap-2"
        >
          <Icon name="phone" className="w-4 h-4" />
          {t(lang, 'mobileViewPreview')} →
        </button>
      )}
    </aside>
  );
};

export default ConfigPanel;
