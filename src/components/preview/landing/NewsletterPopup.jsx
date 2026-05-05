import { useEffect, useState } from 'react';
import { useT } from '../../../lang/LangContext.jsx';

const NewsletterPopup = ({ accent }) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const t = useT();

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-40 grid place-items-center p-3 backdrop-blur-sm"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-white shadow-2xl slide-up"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/40 text-white text-base grid place-items-center hover:bg-black/60"
        >
          ×
        </button>
        <div
          className="px-5 pt-5 pb-3 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #ec4899))` }}
        >
          <div className="text-3xl">💌</div>
          <h3 className="font-display text-lg font-extrabold mt-1.5">{t('newsletterTitle')}</h3>
          <p className="text-[12px] opacity-90 mt-1">{t('newsletterSubtitle')}</p>
        </div>
        <div className="p-5">
          {done ? (
            <div className="text-center py-3">
              <div className="text-3xl">✅</div>
              <div className="font-bold text-gray-900 mt-2">{t('newsletterDone')}</div>
              <div className="text-[11.5px] text-gray-500 mt-1">{t('newsletterCodeLabel')} <span className="font-mono font-bold">SAVE100</span></div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="space-y-2.5"
            >
              <input type="email" required placeholder={t('newsletterEmailPh')} className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
              <button type="submit" className="btn-primary w-full text-[13px] font-extrabold py-2.5 rounded-lg">{t('newsletterSubmit')}</button>
              <button type="button" onClick={() => setOpen(false)} className="w-full text-[11px] text-gray-500 hover:text-gray-700">{t('newsletterDecline')}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
