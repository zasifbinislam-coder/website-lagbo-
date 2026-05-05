import { useEffect } from 'react';
import Icon from '../components/Icon.jsx';
import { CONTACT_INFO, t } from '../data/content.js';
import logo from '../assets/logo.png';

const ACCENT = '#6366f1';

const WhatsAppFAB = ({ lang }) => {
  const msg = encodeURIComponent(
    lang === 'en'
      ? 'Hi! I want to talk about a new website.'
      : 'হ্যালো! আমি একটা নতুন ওয়েবসাইট সম্পর্কে কথা বলতে চাই।'
  );
  const href = `https://wa.me/88${CONTACT_INFO.whatsapp}?text=${msg}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 group"
    >
      <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-[12px] font-bold px-3 py-1.5 rounded-md bg-white text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {lang === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে কথা বলুন'}
      </span>
      <span
        className="relative grid place-items-center w-12 h-12 rounded-full text-white shadow-xl pulse-ring"
        style={{ background: '#22c55e' }}
      >
        <Icon name="whatsapp" className="w-6 h-6" />
      </span>
    </a>
  );
};

const LangToggle = ({ lang, onToggle }) => (
  <button
    onClick={onToggle}
    title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    className="shrink-0 inline-flex items-center gap-1 text-[11.5px] font-bold rounded-lg overflow-hidden border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/85"
  >
    <span className={`px-2 py-1.5 ${lang === 'bn' ? 'bg-white text-gray-900' : ''}`}>বাং</span>
    <span className={`px-2 py-1.5 ${lang === 'en' ? 'bg-white text-gray-900' : ''}`}>EN</span>
  </button>
);

const ThemeToggle = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
    aria-label="Toggle theme"
    className="shrink-0 w-9 h-9 rounded-lg grid place-items-center text-[14px] border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/85"
  >
    {theme === 'light' ? '🌙' : '☀️'}
  </button>
);

const Nav = ({ onHome, current, links, lang, onToggleLang, theme, onToggleTheme }) => (
  <nav
    className="sticky top-0 z-30 backdrop-blur-2xl border-b"
    style={{
      background:
        'linear-gradient(180deg, rgba(7,9,26,0.92) 0%, rgba(7,9,26,0.78) 100%)',
      borderColor: 'rgba(255,255,255,0.08)',
      boxShadow: '0 6px 28px -16px rgba(0,0,0,0.7)',
    }}
  >
    <div className="max-w-6xl mx-auto px-5 md:px-8 h-20 md:h-28 flex items-center justify-between">
      <button onClick={onHome} className="flex items-center">
        <img loading="lazy" decoding="async"
          src={logo}
          alt="Website Lagbo Logo"
          className="h-14 md:h-20 lg:h-24 w-auto object-contain"
          style={{ filter: `drop-shadow(0 6px 16px ${ACCENT}aa) drop-shadow(0 0 6px rgba(236,72,153,0.45))` }}
        />
      </button>
      <div className="flex items-center gap-3 md:gap-4 text-[13.5px] font-semibold text-white/70">
        {links.map((link) => (
          <button
            key={link.key}
            onClick={link.onClick}
            className={`hidden md:inline transition-colors ${
              current === link.key ? 'text-white px-2 py-1 rounded-md bg-white/10' : 'hover:text-white'
            }`}
          >
            {link.label}
          </button>
        ))}
        {onToggleTheme && <ThemeToggle theme={theme} onToggle={onToggleTheme} />}
        <LangToggle lang={lang} onToggle={onToggleLang} />
      </div>
    </div>
  </nav>
);

const Footer = ({ onHome, onPricing, onContact, onAbout, onPrivacy, onTerms, onBlog, lang }) => (
  <footer className="border-t border-white/5 mt-12 py-10 px-5 md:px-8">
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-[13px]">
      <div className="md:col-span-2">
        <button onClick={onHome} className="flex items-center mb-3">
          <img loading="lazy" decoding="async"
            src={logo}
            alt="Website Lagbo Logo"
            className="h-12 w-auto object-contain"
          />
        </button>
        <p className="text-white/55 max-w-sm leading-relaxed">
          {lang === 'en'
            ? 'Affordable, beautiful websites for Bangladesh’s small businesses. 48-hour delivery. 100% Bangla support.'
            : 'বাংলাদেশের ছোট ব্যবসার জন্য সাশ্রয়ী, সুন্দর ওয়েবসাইট। ৪৮ ঘণ্টায় ডেলিভারি। ১০০% বাংলায় সাপোর্ট।'}
        </p>
      </div>
      <div>
        <div className="text-[11px] font-extrabold tracking-wider text-white/45 uppercase mb-3">
          {lang === 'en' ? 'Pages' : 'পেজ'}
        </div>
        <div className="space-y-2 text-white/65">
          <div><button onClick={onAbout} className="hover:text-white">{t(lang, 'navAbout')}</button></div>
          <div><button onClick={onPricing} className="hover:text-white">{t(lang, 'navPricing')}</button></div>
          <div><button onClick={onContact} className="hover:text-white">{t(lang, 'navContact')}</button></div>
          <div><button onClick={onBlog} className="hover:text-white">{t(lang, 'navBlog')}</button></div>
        </div>
      </div>
      <div>
        <div className="text-[11px] font-extrabold tracking-wider text-white/45 uppercase mb-3">
          {lang === 'en' ? 'Legal' : 'আইনি'}
        </div>
        <div className="space-y-2 text-white/65">
          <div><button onClick={onPrivacy} className="hover:text-white">{t(lang, 'navPrivacy')}</button></div>
          <div><button onClick={onTerms} className="hover:text-white">{t(lang, 'navTerms')}</button></div>
          <div className="pt-3">📞 {CONTACT_INFO.phoneDisplay}</div>
          <div>📧 {CONTACT_INFO.email}</div>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-[12px] text-white/40 text-center">
      © {new Date().getFullYear()} Website Lagbo · {lang === 'en' ? 'All rights reserved.' : 'সর্বস্বত্ব সংরক্ষিত।'}
    </div>
  </footer>
);

export default function PageShell({
  current,
  onHome,
  onPricing,
  onContact,
  onAbout,
  onPrivacy,
  onTerms,
  onBlog,
  lang = 'bn',
  onToggleLang,
  theme = 'dark',
  onToggleTheme,
  children,
}) {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENT);
  }, []);

  const links = [
    { key: 'about', label: t(lang, 'navAbout'), onClick: onAbout },
    { key: 'pricing', label: t(lang, 'navPricing'), onClick: onPricing },
    { key: 'blog', label: t(lang, 'navBlog'), onClick: onBlog },
    { key: 'contact', label: t(lang, 'navContact'), onClick: onContact },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto nice-scroll">
      <Nav
        onHome={onHome}
        current={current}
        links={links}
        lang={lang}
        onToggleLang={onToggleLang}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <div className="relative z-10">{children}</div>
      <Footer
        onHome={onHome}
        onPricing={onPricing}
        onContact={onContact}
        onAbout={onAbout}
        onPrivacy={onPrivacy}
        onTerms={onTerms}
        onBlog={onBlog}
        lang={lang}
      />
      <WhatsAppFAB lang={lang} />
    </div>
  );
}
