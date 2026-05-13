import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import { SITE_TYPES, getType } from './data/content.js';
import { LangProvider } from './lang/LangContext.jsx';

/* Code-split the secondary pages and the configurator panels so the initial
   bundle (Home only) stays tiny. Each lazy() chunk is fetched only when the
   user navigates to it — minimizes first-paint cost on slow mobile. */
const ConfigPanel = lazy(() => import('./components/ConfigPanel.jsx'));
const PreviewPanel = lazy(() => import('./components/PreviewPanel.jsx'));
const PricingPage = lazy(() => import('./pages/PricingPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'));
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const TrackPage = lazy(() => import('./pages/TrackPage.jsx'));
const ReferralPage = lazy(() => import('./pages/ReferralPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const PaymentPage = lazy(() => import('./pages/PaymentPage.jsx'));

const PageLoader = () => (
  <div className="absolute inset-0 grid place-items-center text-white/55 text-[13px]">
    <div className="text-center">
      <div className="w-8 h-8 mx-auto rounded-full border-2 border-white/10 border-t-indigo-400 spin" />
      <div className="mt-3">লোড হচ্ছে...</div>
    </div>
  </div>
);

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

/* Path-based routing. Each page has a clean URL — share-able, browser
   back/forward works, SEO sees distinct URLs per page. The /payment route
   accepts an optional trailing ref id: /payment/WL-12345 prefills it. */
const PATH_FROM_PAGE = {
  home:         '/',
  configurator: '/configurator',
  pricing:      '/pricing',
  contact:      '/contact',
  about:        '/about',
  privacy:      '/privacy',
  terms:        '/terms',
  blog:         '/blog',
  track:        '/track',
  referral:     '/referral',
  admin:        '/admin',
  payment:      '/payment',
};

const pageFromUrl = () => {
  try {
    const raw = window.location.pathname || '/';
    const path = raw.length > 1 ? raw.replace(/\/$/, '') : '/';
    for (const [page, p] of Object.entries(PATH_FROM_PAGE)) {
      if (p === path) return page;
    }
    if (path.startsWith('/payment/')) return 'payment';
    if (path.startsWith('/track/'))   return 'track';
    // Legacy ?page=admin support (in case any old bookmarks)
    const q = new URLSearchParams(window.location.search).get('page');
    if (q && PATH_FROM_PAGE[q]) return q;
  } catch {}
  return 'home';
};

const navigateTo = (page) => {
  if (typeof window === 'undefined') return;
  const targetPath = PATH_FROM_PAGE[page] || '/';
  const currentPath = window.location.pathname || '/';
  // Stay on subpaths of the same page (e.g. /payment/WL-123 → /payment)
  if (currentPath === targetPath) return;
  if (targetPath !== '/' && currentPath.startsWith(targetPath + '/')) return;
  window.history.pushState({ page }, '', targetPath);
};

export default function App() {
  const [page, setPage] = useState(pageFromUrl); // 'home' | 'configurator' | ...

  /* Browser back / forward syncs URL → page state. */
  useEffect(() => {
    const onPopState = () => setPage(pageFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const setPageAndUrl = (newPage) => {
    navigateTo(newPage);
    setPage(newPage);
  };
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
    // Theme toggle is disabled; pin dark to avoid stale light from old visits.
    document.documentElement.dataset.theme = 'dark';
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

  /* Prefetch configurator chunks during idle time on Home so clicking
     "Start" feels instant. Also warm the API lambda so the first form
     submit doesn't pay cold-start. Skips on slow connections / data-saver. */
  useEffect(() => {
    if (page !== 'home') return;
    const conn = navigator.connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const handle = idle(() => {
      import('./components/ConfigPanel.jsx');
      import('./components/PreviewPanel.jsx');
      fetch('/api/health', { cache: 'no-store' }).catch(() => {});
    });
    return () => cancel(handle);
  }, [page]);

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

  const goToConfigurator = () => setPageAndUrl('configurator');
  const goHome = () => setPageAndUrl('home');
  const goPricing = () => setPageAndUrl('pricing');
  const goContact = () => setPageAndUrl('contact');
  const goAbout = () => setPageAndUrl('about');
  const goPrivacy = () => setPageAndUrl('privacy');
  const goTerms = () => setPageAndUrl('terms');
  const goBlog = () => setPageAndUrl('blog');
  const goTrack = () => setPageAndUrl('track');
  const goReferral = () => setPageAndUrl('referral');
  const goPayment = () => setPageAndUrl('payment');

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
    onPayment: goPayment,
    onStart: goToConfigurator,
    lang,
    onToggleLang: toggleLang,
    /* theme toggle disabled — site is dark-mode only for now.
       Light mode would require an audit of every component (most use
       hardcoded `text-white` classes). Removing the toggle is cleaner
       than shipping a broken light mode. */
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
        <Suspense fallback={<PageLoader />}>
          <PricingPage
            {...sharedNav}
            onBackToConfig={goToConfigurator}
            selectedType={type}
            selectedFeatures={features}
            accent={accent}
          />
        </Suspense>
      </LangProvider>
    );
  }

  if (page === 'contact') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><ContactPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'about') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><AboutPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'privacy') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><PrivacyPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'terms') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><TermsPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'blog') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><BlogPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'track') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><TrackPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'admin') {
    /* No LangProvider, no nav, no footer — standalone dashboard.
       Reachable only via /admin. Hidden from sitemap + robots. */
    return (
      <Suspense fallback={<PageLoader />}><AdminPage /></Suspense>
    );
  }

  if (page === 'payment') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><PaymentPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  if (page === 'referral') {
    return (
      <LangProvider lang={lang}>
        <Suspense fallback={<PageLoader />}><ReferralPage {...sharedNav} /></Suspense>
      </LangProvider>
    );
  }

  return (
    <LangProvider lang={lang}>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </LangProvider>
  );
}
