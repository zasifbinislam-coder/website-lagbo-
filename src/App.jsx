import { useEffect, useRef, useState } from 'react';
import ConfigPanel from './components/ConfigPanel.jsx';
import PreviewPanel from './components/PreviewPanel.jsx';
import HomePage from './pages/HomePage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import TrackPage from './pages/TrackPage.jsx';
import ReferralPage from './pages/ReferralPage.jsx';
import { SITE_TYPES, getType } from './data/content.js';
import { LangProvider } from './lang/LangContext.jsx';

const initialFeaturesByType = () =>
  Object.fromEntries(SITE_TYPES.map((t) => [t.key, { ...t.defaults }]));

const readStoredLang = () => {
  try {
    const v = localStorage.getItem('wl_lang');
    return v === 'en' || v === 'bn' ? v : 'bn';
  } catch {
    return 'bn';
  }
};

const readStoredTheme = () => {
  try {
    const v = localStorage.getItem('wl_theme');
    return v === 'light' || v === 'dark' ? v : 'dark';
  } catch {
    return 'dark';
  }
};

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'configurator'
  const [type, setType] = useState('landing');
  const [featuresByType, setFeaturesByType] = useState(initialFeaturesByType);
  const [accent, setAccent] = useState(getType('landing').accent);
  const [device, setDevice] = useState('desktop');
  const [cart, setCart] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState('BD-10293');
  const [lang, setLang] = useState(readStoredLang);
  const [theme, setTheme] = useState(readStoredTheme);
  const [mobileTab, setMobileTab] = useState('config'); // 'config' | 'preview' (mobile only)
  const previewRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  useEffect(() => {
    try { localStorage.setItem('wl_lang', lang); } catch {}
    document.documentElement.lang = lang === 'en' ? 'en' : 'bn';
  }, [lang]);

  useEffect(() => {
    try { localStorage.setItem('wl_theme', theme); } catch {}
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* Compute the scale for the rotated desktop preview on mobile.
     Pre-rotation frame is 1200×750. After rotate(-90deg) the visual is
     750w × 1200h. Math.max => the visual fills the area below the toolbar
     edge-to-edge; the smaller dimension overflows symmetrically and is
     clipped by the viewport. */
  useEffect(() => {
    const PRE_W = 1200;
    const PRE_H = 750;
    const TOOLBAR_H = 80;
    const update = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight - TOOLBAR_H, 200);
      const scale = Math.max(w / PRE_H, h / PRE_W);
      document.documentElement.style.setProperty('--lscape-scale', scale.toFixed(4));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  /* Cursor spotlight — sets --mx / --my CSS vars used by body::after */
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;
    let lastX = 0, lastY = 0;
    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', `${lastX}px`);
        document.documentElement.style.setProperty('--my', `${lastY}px`);
        raf = 0;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toggleLang = () => setLang((l) => (l === 'en' ? 'bn' : 'en'));
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const goToConfigurator = () => setPage('configurator');
  const goHome = () => setPage('home');
  const goPricing = () => setPage('pricing');
  const goContact = () => setPage('contact');
  const goAbout = () => setPage('about');
  const goPrivacy = () => setPage('privacy');
  const goTerms = () => setPage('terms');
  const goBlog = () => setPage('blog');
  const goTrack = () => setPage('track');
  const goReferral = () => setPage('referral');

  const handleSetType = (newType) => {
    setType(newType);
    setAccent(getType(newType).accent);
  };

  const features = featuresByType[type];
  const setFeatures = (updater) => {
    setFeaturesByType((prev) => {
      const cur = prev[type];
      const next = typeof updater === 'function' ? updater(cur) : updater;
      return { ...prev, [type]: next };
    });
  };

  const addToCart = (p) => {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
    if (type === 'store') {
      setFeatures((f) => (f.checkout ? f : { ...f, checkout: true }));
    }
  };

  const placeOrder = () => {
    if (type === 'store' && cart.length === 0) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setOrderId('BD-' + Math.floor(10000 + Math.random() * 89999));
      setFeatures((f) => ({ ...f, cod: true }));
      if (type === 'store') setCart([]);
      requestAnimationFrame(() => {
        previewRef.current?.scrollTo({
          top: previewRef.current.scrollHeight,
          behavior: 'smooth',
        });
      });
    }, 900);
  };

  const resetAll = () => {
    const t = getType(type);
    setFeatures({ ...t.defaults });
    setAccent(t.accent);
    if (type === 'store') setCart([]);
  };

  const setAllExtras = (on) => {
    const t = getType(type);
    setFeatures(Object.fromEntries(t.extras.map((e) => [e.key, !!on])));
  };

  const sharedNav = {
    onHome: goHome,
    onPricing: goPricing,
    onContact: goContact,
    onAbout: goAbout,
    onPrivacy: goPrivacy,
    onTerms: goTerms,
    onBlog: goBlog,
    onTrack: goTrack,
    onReferral: goReferral,
    onStart: goToConfigurator,
    lang,
    onToggleLang: toggleLang,
    theme,
    onToggleTheme: toggleTheme,
  };

  if (page === 'home') {
    return (
      <LangProvider lang={lang}>
        <HomePage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'pricing') {
    return (
      <LangProvider lang={lang}>
        <PricingPage
          {...sharedNav}
          onBackToConfig={goToConfigurator}
          selectedType={type}
          selectedFeatures={features}
          accent={accent}
        />
      </LangProvider>
    );
  }

  if (page === 'contact') {
    return (
      <LangProvider lang={lang}>
        <ContactPage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'about') {
    return (
      <LangProvider lang={lang}>
        <AboutPage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'privacy') {
    return (
      <LangProvider lang={lang}>
        <PrivacyPage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'terms') {
    return (
      <LangProvider lang={lang}>
        <TermsPage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'blog') {
    return (
      <LangProvider lang={lang}>
        <BlogPage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'track') {
    return (
      <LangProvider lang={lang}>
        <TrackPage {...sharedNav} />
      </LangProvider>
    );
  }

  if (page === 'referral') {
    return (
      <LangProvider lang={lang}>
        <ReferralPage {...sharedNav} />
      </LangProvider>
    );
  }

  return (
    <LangProvider lang={lang}>
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          <ConfigPanel
            type={type}
            setType={handleSetType}
            features={features}
            setFeatures={setFeatures}
            accent={accent}
            setAccent={setAccent}
            onSetAllExtras={setAllExtras}
            onReset={resetAll}
            onGoHome={goHome}
            onGetQuote={goPricing}
            onContact={goContact}
            lang={lang}
            onToggleLang={toggleLang}
            mobileVisible={mobileTab === 'config'}
            onPreviewMobile={() => {
              setDevice('mobile');
              setMobileTab('preview');
            }}
          />
          <PreviewPanel
            type={type}
            features={features}
            accent={accent}
            device={device}
            setDevice={setDevice}
            cart={cart}
            onAdd={addToCart}
            onPlace={placeOrder}
            placing={placing}
            orderId={orderId}
            previewRef={previewRef}
            lang={lang}
            mobileVisible={mobileTab === 'preview'}
            onEditMobile={() => setMobileTab('config')}
            onGetQuote={goPricing}
          />
        </div>
      </div>
    </LangProvider>
  );
}
