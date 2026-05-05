import { useEffect, useState } from 'react';
import PageShell from './PageShell.jsx';
import { useToast } from '../components/Toast.jsx';
import { CONTACT_INFO, t } from '../data/content.js';
import { formatBDT } from '../utils.js';

const ACCENT = '#6366f1';
const SITE_BASE = (typeof window !== 'undefined' && window.location?.origin) || 'https://websitelagbo.com';

const readSavedCode = () => {
  try { return localStorage.getItem('wl_referral_code') || ''; } catch { return ''; }
};
const readStats = () => {
  try { return JSON.parse(localStorage.getItem('wl_referral_stats') || '{"clicks":0,"signups":0,"earned":0}'); }
  catch { return { clicks: 0, signups: 0, earned: 0 }; }
};

const StatCard = ({ label, value, color }) => (
  <div className="rounded-xl p-4 border border-white/10 text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
    <div className="font-display font-extrabold text-2xl md:text-3xl tabular-nums" style={{ color }}>{value}</div>
    <div className="text-[11px] font-bold text-white/55 uppercase tracking-wider mt-1">{label}</div>
  </div>
);

export default function ReferralPage(props) {
  const { lang = 'bn' } = props;
  const toast = useToast();
  const [code, setCode] = useState(readSavedCode);
  const [draft, setDraft] = useState('');
  const stats = readStats();

  // Capture incoming referral code from URL ?ref=XXXX (so visitors who land via
  // someone's referral get attributed to that code in localStorage).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const incoming = params.get('ref');
      if (incoming) {
        localStorage.setItem('wl_referred_by', incoming.toUpperCase());
      }
    } catch {}
  }, []);

  const link = code ? `${SITE_BASE}/?ref=${encodeURIComponent(code)}` : '';

  const create = () => {
    const v = draft.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
    if (!v || v.length < 3) {
      toast.error(lang === 'en' ? 'Code must be 3+ letters/digits' : '৩+ অক্ষর/সংখ্যার কোড দিন');
      return;
    }
    try { localStorage.setItem('wl_referral_code', v); } catch {}
    setCode(v);
    setDraft('');
    toast.success(lang === 'en' ? 'Code created' : 'কোড তৈরি হয়েছে');
  };

  const copy = (text) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(t(lang, 'referralCopiedToast')),
      () => {}
    );
  };

  const shareWhatsapp = () => {
    const msg = encodeURIComponent(
      lang === 'en'
        ? `Get a beautiful website built in 48 hours with 10% off — use my referral: ${link}`
        : `৪৮ ঘণ্টায় সুন্দর ওয়েবসাইট, ১০% ছাড় — আমার রেফারেল: ${link}`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank', 'noreferrer');
  };

  return (
    <PageShell {...props} current="referral">
      <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            {t(lang, 'referralPageBadge')}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-4 leading-[1.15]">
            {t(lang, 'referralPageTitle')}
          </h1>
          <p className="text-[14px] md:text-[16px] text-white/65 mt-3 max-w-2xl mx-auto">
            {t(lang, 'referralPageSub')}
          </p>
        </div>

        {/* How it works */}
        <div className="rounded-2xl p-5 md:p-6 border border-white/10 mb-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="font-display text-lg font-extrabold text-white mb-3">{t(lang, 'referralHowTitle')}</div>
          <div className="grid md:grid-cols-3 gap-3">
            {[t(lang, 'referralHow1'), t(lang, 'referralHow2'), t(lang, 'referralHow3')].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full grid place-items-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${ACCENT}, #ec4899)` }}>
                  {i + 1}
                </span>
                <div className="text-[13.5px] text-white/75 leading-relaxed">{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code creator OR share UI */}
        {!code ? (
          <div className="rounded-2xl p-5 md:p-6 border border-white/10 mb-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="font-display text-lg font-extrabold text-white">{t(lang, 'referralCreateCode')}</div>
            <div className="text-[12.5px] text-white/55 mt-1">{t(lang, 'referralCreateCodeDesc')}</div>
            <div className="mt-4 flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.toUpperCase())}
                placeholder={t(lang, 'referralNamePlaceholder')}
                className="flex-1 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-white outline-none focus:border-white/40 font-mono font-bold tracking-wider"
                maxLength={20}
              />
              <button onClick={create} className="btn-primary text-[13px] font-extrabold px-4 py-2.5 rounded-lg">
                {t(lang, 'referralCreateBtn')}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl p-5 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
                  {t(lang, 'referralYourCodeLabel')}
                </div>
                <div className="font-display font-extrabold text-3xl md:text-4xl grad-text font-mono mt-2 tracking-wider">{code}</div>
                <button
                  onClick={() => copy(code)}
                  className="mt-3 text-[12px] font-bold px-3 py-1.5 rounded-md border border-white/15 text-white/85 hover:bg-white/5"
                >
                  📋 {t(lang, 'referralCopyCode')}
                </button>
              </div>
              <div className="rounded-2xl p-5 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
                  {t(lang, 'referralYourLinkLabel')}
                </div>
                <div className="text-[12.5px] font-mono text-white/85 mt-2 break-all">{link}</div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => copy(link)}
                    className="text-[12px] font-bold px-3 py-1.5 rounded-md border border-white/15 text-white/85 hover:bg-white/5"
                  >
                    📋 {t(lang, 'referralCopyLink')}
                  </button>
                  <button
                    onClick={shareWhatsapp}
                    className="text-[12px] font-extrabold px-3 py-1.5 rounded-md text-white"
                    style={{ background: '#22c55e' }}
                  >
                    🟢 WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-2 text-[11px] font-extrabold tracking-wider text-white/45 uppercase">{t(lang, 'referralStatsTitle')}</div>
            <div className="grid grid-cols-3 gap-3">
              <StatCard label={t(lang, 'referralStatsClicks')} value={stats.clicks || 0} color={ACCENT} />
              <StatCard label={t(lang, 'referralStatsSignups')} value={stats.signups || 0} color="#ec4899" />
              <StatCard label={t(lang, 'referralStatsEarned')} value={formatBDT(stats.earned || 0)} color="#10b981" />
            </div>
          </>
        )}

        {/* CTA strip */}
        <div className="mt-8 rounded-2xl p-5 border border-white/10 flex items-center gap-3 text-[13px] text-white/70" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <span className="text-2xl shrink-0">📞</span>
          <span>
            {lang === 'en' ? 'Questions about the program? Call ' : 'প্রোগ্রাম সম্পর্কে প্রশ্ন? কল '}
            <a className="font-bold text-white hover:underline" href={`tel:+88${CONTACT_INFO.phone}`}>{CONTACT_INFO.phoneDisplay}</a>
          </span>
        </div>
      </section>
    </PageShell>
  );
}
