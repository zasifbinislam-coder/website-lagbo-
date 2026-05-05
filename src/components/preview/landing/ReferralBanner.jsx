import Icon from '../../Icon.jsx';
import { REFERRAL_INFO } from '../../../data/content.js';
import { formatBDT } from '../../../utils.js';
import { useT } from '../../../lang/LangContext.jsx';

const ReferralBanner = ({ accent }) => {
  const r = REFERRAL_INFO;
  const t = useT();
  const socials = [
    { label: t('referralWhatsapp'), icon: 'whatsapp', bg: '#22c55e' },
    { label: t('referralFacebook'), icon: 'facebook', bg: '#1877f2' },
    { label: t('referralEmail'), icon: 'mail', bg: '#0ea5e9' },
  ];
  return (
    <section className="section-in px-5 md:px-8 py-6 bg-white">
      <div
        className="rounded-2xl overflow-hidden grid md:grid-cols-2 max-w-4xl mx-auto"
        style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #ec4899))` }}
      >
        <div className="p-6 md:p-7 text-white">
          <div className="text-[11px] font-extrabold tracking-wider opacity-90">{t('referralBadge')}</div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold mt-1.5 leading-tight">
            {t('referralTitlePrefix')} {formatBDT(r.refReward)} {t('referralTitleSuffix')}
          </h2>
          <p className="text-[12.5px] opacity-90 mt-1.5">
            {t('referralDescPrefix')} {formatBDT(r.refReward)} {t('referralDescMid')} {formatBDT(r.friendReward)} {t('referralDescSuffix')}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/15 backdrop-blur rounded-lg p-2.5">
              <div className="text-[11px] opacity-80">{t('referralYourEarn')}</div>
              <div className="text-lg font-extrabold">{formatBDT(r.totalEarned)}</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-lg p-2.5">
              <div className="text-[11px] opacity-80">{t('referralSent')}</div>
              <div className="text-lg font-extrabold">{r.refSent}{t('referralSentSuffix')}</div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-7 bg-white space-y-3">
          <div className="text-[12.5px] font-bold text-gray-700">{t('referralLinkLabel')}</div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50">
            <span className="text-[11.5px] font-mono text-gray-700 truncate flex-1">{r.refLink}</span>
            <button className="text-[11px] font-bold px-2 py-1 rounded text-white" style={{ background: accent }}>
              {t('referralCopy')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {socials.map((s) => (
              <button
                key={s.label}
                className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold py-2 rounded-lg text-white"
                style={{ background: s.bg }}
              >
                <Icon name={s.icon} className="w-3.5 h-3.5" />
                {s.label}
              </button>
            ))}
          </div>

          <div className="text-[10.5px] text-gray-500 text-center pt-2 border-t border-gray-100">
            {t('referralFooter')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
