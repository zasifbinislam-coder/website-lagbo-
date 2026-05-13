import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { CONTACT_INFO, t, tr } from '../data/content.js';
import { validateBDPhone, validateEmail } from '../utils.js';
import { useToast } from '../components/Toast.jsx';
import logo from '../assets/logo.png';

const ACCENT = '#6366f1';

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

const Nav = ({ onHome, onAbout, onPricing, onBlog, onTrack, onContact, lang, onToggleLang, current = 'contact' }) => {
  const links = [
    { key: 'about',   label: t(lang, 'navAbout'),   onClick: onAbout },
    { key: 'pricing', label: t(lang, 'navPricing'), onClick: onPricing },
    { key: 'blog',    label: t(lang, 'navBlog'),    onClick: onBlog },
    { key: 'track',   label: t(lang, 'navTrack'),   onClick: onTrack },
    { key: 'contact', label: t(lang, 'navContact'), onClick: onContact },
  ];
  return (
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
        <button onClick={onHome} className="flex items-center gap-2.5">
          <img loading="lazy" decoding="async"
            src={logo}
            alt="Website Lagbo Logo"
            className="h-14 md:h-20 lg:h-24 w-auto object-contain"
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
          <LangToggle lang={lang} onToggle={onToggleLang} />
        </div>
      </div>
    </nav>
  );
};

/* Open Sat-Thu 10am-8pm; closed Friday */
const computeOpenStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 Sun .. 6 Sat
  const hour = now.getHours();
  const isFriday = day === 5;
  const inHours = hour >= 10 && hour < 20;
  return !isFriday && inHours;
};

const Hero = ({ lang }) => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: `radial-gradient(closest-side, ${ACCENT}, transparent)` }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(closest-side, #ec4899, transparent)' }}
      />
      <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
          {t(lang, 'contactHeroBadge')}
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.15] mt-5 text-white">
          {t(lang, 'contactHeroTitle')}
        </h1>
        <p className="text-[14px] md:text-[16px] text-white/65 mt-4 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
          {t(lang, 'contactHeroSubtitle')}
        </p>
      </div>
    </section>
  );
};

const QuickActions = ({ lang }) => {
  const items = [
    {
      label: t(lang, 'contactCallNow'),
      icon: 'phone',
      bg: '#22c55e',
      href: `tel:+88${CONTACT_INFO.phone}`,
    },
    {
      label: t(lang, 'contactWhatsapp'),
      icon: 'whatsapp',
      bg: '#16a34a',
      href: `https://wa.me/88${CONTACT_INFO.whatsapp}`,
    },
    {
      label: t(lang, 'contactSendEmail'),
      icon: 'mail',
      bg: '#0ea5e9',
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      label: t(lang, 'contactGetDirections'),
      icon: 'pin',
      bg: '#a855f7',
      href: CONTACT_INFO.mapLink,
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith('http') ? '_blank' : undefined}
          rel={it.href.startsWith('http') ? 'noreferrer' : undefined}
          className="rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all hover:-translate-y-0.5 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <span
            className="w-11 h-11 rounded-xl grid place-items-center text-white shrink-0"
            style={{ background: it.bg, boxShadow: `0 8px 24px -10px ${it.bg}` }}
          >
            <Icon name={it.icon} className="w-5 h-5" />
          </span>
          <span className="font-bold text-[13.5px] text-white">{it.label}</span>
        </a>
      ))}
    </div>
  );
};

const InfoCards = ({ lang }) => {
  const cards = [
    {
      label: t(lang, 'contactPhone'),
      value: CONTACT_INFO.phoneDisplay,
      icon: 'phone',
      color: '#22c55e',
      href: `tel:+88${CONTACT_INFO.phone}`,
    },
    {
      label: t(lang, 'contactEmail'),
      value: CONTACT_INFO.email,
      icon: 'mail',
      color: '#0ea5e9',
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      label: t(lang, 'contactAddress'),
      value: tr(CONTACT_INFO, 'address', lang),
      icon: 'pin',
      color: '#a855f7',
      href: CONTACT_INFO.mapLink,
    },
    {
      label: t(lang, 'contactHours'),
      value: tr(CONTACT_INFO, 'hours', lang),
      sub: tr(CONTACT_INFO, 'closed', lang),
      icon: 'clock',
      color: '#f59e0b',
    },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {cards.map((c) => {
        const Tag = c.href ? 'a' : 'div';
        const tagProps = c.href
          ? {
              href: c.href,
              target: c.href.startsWith('http') ? '_blank' : undefined,
              rel: c.href.startsWith('http') ? 'noreferrer' : undefined,
            }
          : {};
        return (
          <Tag
            key={c.label}
            {...tagProps}
            className={`rounded-2xl p-4 border border-white/10 ${
              c.href ? 'hover:border-white/30 transition-colors' : ''
            } flex items-start gap-3`}
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <span
              className="w-11 h-11 rounded-xl grid place-items-center text-white shrink-0"
              style={{ background: c.color }}
            >
              <Icon name={c.icon} className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <div className="text-[10.5px] font-extrabold tracking-wider text-white/45 uppercase">
                {c.label}
              </div>
              <div className="font-bold text-white text-[14px] mt-0.5 break-words">
                {c.value}
              </div>
              {c.sub && <div className="text-[11.5px] text-rose-300/85 mt-0.5">{c.sub}</div>}
            </div>
          </Tag>
        );
      })}
    </div>
  );
};

const BkashSection = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const num = CONTACT_INFO.phone;
  const display = CONTACT_INFO.phoneDisplay;
  const copy = () => {
    navigator.clipboard?.writeText(num).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        background: 'linear-gradient(135deg, rgba(226,19,110,0.18), rgba(226,19,110,0.04))',
        borderColor: 'rgba(226,19,110,0.35)',
      }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <span className="px-2 py-1 rounded-md text-[10.5px] font-extrabold text-white" style={{ background: '#E2136E' }}>bKash</span>
        <span className="text-[11px] font-bold text-white/65 uppercase tracking-wider">{t(lang, 'bkashSendMoney')}</span>
      </div>
      <div className="font-display text-[16px] md:text-[17px] font-extrabold text-white">
        {t(lang, 'bkashSectionTitle')}
      </div>
      <div className="text-[12.5px] text-white/65 mt-1">
        {t(lang, 'bkashSectionSub')}
      </div>
      <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10">
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] font-bold text-white/45 uppercase tracking-wider">{t(lang, 'bkashNumberLabel')}</div>
          <div className="font-mono font-extrabold text-white text-[15px] md:text-[17px] tabular-nums">{display}</div>
        </div>
        <button
          onClick={copy}
          className="shrink-0 text-[11.5px] font-bold px-3 py-1.5 rounded-md text-white"
          style={{ background: '#E2136E' }}
        >
          {copied ? t(lang, 'bkashCopied') : t(lang, 'bkashCopy')}
        </button>
      </div>
      <div className="text-[11.5px] text-white/55 mt-2.5 leading-relaxed">{t(lang, 'bkashRefNote')}</div>
    </div>
  );
};

const WhyCallUs = ({ lang }) => (
  <div className="rounded-2xl p-5 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
    <div className="font-display text-[15px] font-extrabold text-white mb-3">{t(lang, 'contactWhyTitle')}</div>
    <div className="grid grid-cols-2 gap-2.5">
      {['contactWhy1', 'contactWhy2', 'contactWhy3', 'contactWhy4'].map((k) => (
        <div key={k} className="text-[12.5px] text-white/75 flex items-start gap-2">
          <span>{t(lang, k)}</span>
        </div>
      ))}
    </div>
  </div>
);

const ContactForm = ({ form, setForm, onSubmit, sending, lang, errors = {} }) => {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const fieldClass = (key, base = 'w-full text-[13px] px-3 py-2.5 rounded-lg border bg-white/[0.04] text-white outline-none focus:border-white/40') =>
    `${base} ${errors[key] ? 'border-rose-400/60' : 'border-white/10'}`;
  const errLine = (key) =>
    errors[key] ? <span className="block text-[11px] text-rose-300 mt-1">{errors[key]}</span> : null;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="rounded-2xl p-5 md:p-6 border border-white/10 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div>
        <div className="font-display text-lg md:text-xl font-extrabold text-white">{t(lang, 'contactFormTitle')}</div>
        <div className="text-[12.5px] text-white/55 mt-0.5">{t(lang, 'contactFormSubtitle')}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'contactFormName')} *</span>
          <input value={form.name} onChange={set('name')} className={fieldClass('name')} />
          {errLine('name')}
        </label>
        <label className="block">
          <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'contactFormPhone')} *</span>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            value={form.phone}
            onChange={set('phone')}
            className={fieldClass('phone')}
          />
          {errLine('phone')}
        </label>
      </div>
      <label className="block">
        <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'contactFormEmail')}</span>
        <input type="email" value={form.email} onChange={set('email')} className={fieldClass('email')} />
        {errLine('email')}
      </label>
      <label className="block">
        <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'contactFormSubject')}</span>
        <input
          placeholder={t(lang, 'contactFormSubjectPh')}
          value={form.subject}
          onChange={set('subject')}
          className={fieldClass('subject')}
        />
      </label>
      <label className="block">
        <span className="block text-[11px] font-bold text-white/65 mb-1">{t(lang, 'contactFormMessage')} *</span>
        <textarea
          rows={5}
          placeholder={t(lang, 'contactFormMessagePh')}
          value={form.message}
          onChange={set('message')}
          className={`${fieldClass('message')} resize-none`}
        />
        {errLine('message')}
      </label>
      <button
        type="submit"
        disabled={sending}
        className="w-full btn-primary text-[14px] font-extrabold py-3 rounded-xl disabled:opacity-60"
      >
        {sending ? t(lang, 'contactFormSubmitting') : t(lang, 'contactFormSubmit')}
      </button>
    </form>
  );
};

const ThanksScreen = ({ onHome, lang }) => (
  <div className="max-w-2xl mx-auto px-5 md:px-8 py-12 md:py-20">
    <div className="rounded-3xl p-8 md:p-12 text-center border border-emerald-500/30" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.02))' }}>
      <div className="text-5xl md:text-6xl">✅</div>
      <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-4">
        {t(lang, 'contactThanksTitle')}
      </h1>
      <p className="text-[14px] md:text-[16px] text-white/70 mt-3 max-w-md mx-auto">
        {t(lang, 'contactThanksDesc')}
      </p>
      <button
        onClick={onHome}
        className="mt-6 btn-primary text-[13px] font-bold px-6 py-2.5 rounded-lg"
      >
        {t(lang, 'contactThanksHome')}
      </button>
    </div>
  </div>
);

export default function ContactPage({ onHome, onAbout, onPricing, onBlog, onTrack, onContact, lang = 'bn', onToggleLang }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', ACCENT);
  }, []);

  const submit = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t(lang, 'validRequired');
    if (!form.phone.trim()) errs.phone = t(lang, 'validRequired');
    else if (!validateBDPhone(form.phone)) errs.phone = t(lang, 'validPhoneBD');
    if (form.email && !validateEmail(form.email)) errs.email = t(lang, 'validEmail');
    if (!form.message.trim()) errs.message = t(lang, 'validRequired');
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(t(lang, 'toastFormError'));
      return;
    }
    setSending(true);
    const lead = { submittedAt: new Date().toISOString(), lang, ...form };
    try {
      const existing = JSON.parse(localStorage.getItem('wl_contact_msgs') || '[]');
      existing.push(lead);
      localStorage.setItem('wl_contact_msgs', JSON.stringify(existing));
    } catch {}
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
      .catch(() => {})
      .finally(() => {
        setSending(false);
        setSubmitted(true);
        toast.success(t(lang, 'toastMessageSent'));
      });
  };

  return (
    <div className="absolute inset-0 overflow-y-auto nice-scroll">
      <Nav
        onHome={onHome}
        onAbout={onAbout}
        onPricing={onPricing}
        onBlog={onBlog}
        onTrack={onTrack}
        onContact={onContact}
        lang={lang}
        onToggleLang={onToggleLang}
        current="contact"
      />

      {submitted ? (
        <ThanksScreen onHome={onHome} lang={lang} />
      ) : (
        <>
          <Hero lang={lang} />

          <div className="max-w-6xl mx-auto px-5 md:px-8 pb-20 space-y-8">
            <QuickActions lang={lang} />

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoCards lang={lang} />
                <BkashSection lang={lang} />
                <WhyCallUs lang={lang} />
                <iframe
                  title="map"
                  className="w-full h-56 rounded-2xl border border-white/10"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Dhanmondi+10+Dhaka&output=embed"
                />
              </div>
              <ContactForm form={form} setForm={setForm} onSubmit={submit} sending={sending} lang={lang} errors={formErrors} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
