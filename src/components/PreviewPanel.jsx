import Icon from './Icon.jsx';
import { getType, t, tr } from '../data/content.js';

// Store
import HeroSection from './preview/HeroSection.jsx';
import ProductGrid from './preview/ProductGrid.jsx';
import CheckoutSection from './preview/CheckoutSection.jsx';
import CODConfirmation from './preview/CODConfirmation.jsx';
import Testimonials from './preview/Testimonials.jsx';
import Footer from './preview/Footer.jsx';
import WhatsAppFloat from './preview/WhatsAppFloat.jsx';

// Landing
import LandingHero from './preview/landing/LandingHero.jsx';
import TrustBadges from './preview/landing/TrustBadges.jsx';
import FeatureList from './preview/landing/FeatureList.jsx';
import FreeGifts from './preview/landing/FreeGifts.jsx';
import WhatsAppReviews from './preview/landing/WhatsAppReviews.jsx';
import OrderForm from './preview/landing/OrderForm.jsx';
import CountdownBanner from './preview/landing/CountdownBanner.jsx';
import FAQ from './preview/landing/FAQ.jsx';
import StickyCTA from './preview/landing/StickyCTA.jsx';
import ComparisonTable from './preview/landing/ComparisonTable.jsx';
import BeforeAfter from './preview/landing/BeforeAfter.jsx';
import VideoTestimonials from './preview/landing/VideoTestimonials.jsx';
import LiveOrders from './preview/landing/LiveOrders.jsx';
import StockCounter from './preview/landing/StockCounter.jsx';
import FreeShippingBar from './preview/landing/FreeShippingBar.jsx';
import PaymentMethods from './preview/landing/PaymentMethods.jsx';
import QA from './preview/landing/QA.jsx';
import SpinToWin from './preview/landing/SpinToWin.jsx';
import BundleOffer from './preview/landing/BundleOffer.jsx';
import NewsletterPopup from './preview/landing/NewsletterPopup.jsx';
import SizeChart from './preview/landing/SizeChart.jsx';
import ProductSpecs from './preview/landing/ProductSpecs.jsx';
import ReferralBanner from './preview/landing/ReferralBanner.jsx';

// Healthcare
import HealthcareHero from './preview/healthcare/HealthcareHero.jsx';
import DoctorsList from './preview/healthcare/DoctorsList.jsx';
import HealthServices from './preview/healthcare/HealthServices.jsx';
import AppointmentBooking from './preview/healthcare/AppointmentBooking.jsx';

// Real Estate
import RealEstateHero from './preview/realestate/RealEstateHero.jsx';
import PropertyListings from './preview/realestate/PropertyListings.jsx';
import AgentContact from './preview/realestate/AgentContact.jsx';

// Education
import EducationHero from './preview/education/EducationHero.jsx';
import CoursesList from './preview/education/CoursesList.jsx';
import InstructorsList from './preview/education/InstructorsList.jsx';
import EnrollmentBanner from './preview/education/EnrollmentBanner.jsx';

// Photographer
import PhotoHero from './preview/photographer/PhotoHero.jsx';
import PortfolioGallery from './preview/photographer/PortfolioGallery.jsx';
import ShootPackages from './preview/photographer/ShootPackages.jsx';

// Gym
import GymHero from './preview/gym/GymHero.jsx';
import ClassSchedule from './preview/gym/ClassSchedule.jsx';
import MembershipPlans from './preview/gym/MembershipPlans.jsx';
import GymTrial from './preview/gym/GymTrial.jsx';

// Restaurant
import RestaurantHero from './preview/restaurant/RestaurantHero.jsx';
import MenuSection from './preview/restaurant/MenuSection.jsx';
import SpecialsSection from './preview/restaurant/SpecialsSection.jsx';
import ReservationForm from './preview/restaurant/ReservationForm.jsx';
import GallerySection from './preview/restaurant/GallerySection.jsx';

// Service
import ServiceHero from './preview/service/ServiceHero.jsx';
import ServicesList from './preview/service/ServicesList.jsx';
import BookingForm from './preview/service/BookingForm.jsx';
import PricingSection from './preview/service/PricingSection.jsx';
import TeamSection from './preview/service/TeamSection.jsx';

// Marketplace
import MarketplaceHero from './preview/marketplace/MarketplaceHero.jsx';
import CategoryGrid from './preview/marketplace/CategoryGrid.jsx';
import FeaturedProducts from './preview/marketplace/FeaturedProducts.jsx';
import HotDeals from './preview/marketplace/HotDeals.jsx';
import ComboBundles from './preview/marketplace/ComboBundles.jsx';
import AppDownload from './preview/marketplace/AppDownload.jsx';
import TrackOrder from './preview/marketplace/TrackOrder.jsx';

const HOST_BY_TYPE = {
  landing: 'apnardokan.shop',
  store: 'apnarbrand.shop',
  restaurant: 'spiceroute.kitchen',
  service: 'blissbeauty.studio',
  marketplace: 'shopmart.bd',
  healthcare: 'preventa.clinic',
  realestate: 'homequest.bd',
  education: 'learnplanet.bd',
  photographer: 'canvas.studio',
  gym: 'fitzone.gym',
};

const NAV_BY_TYPE = {
  bn: {
    store: ['শপ', 'আমাদের সম্পর্কে', 'কন্ট্যাক্ট'],
    landing: [],
    restaurant: ['মেনু', 'আমাদের সম্পর্কে', 'রিজার্ভ'],
    service: ['সার্ভিস', 'টিম', 'বুক'],
    marketplace: ['ক্যাটাগরি', 'ডিল', 'অর্ডার ট্র্যাক'],
    healthcare: ['ডাক্তার', 'সার্ভিস', 'অ্যাপয়েন্টমেন্ট'],
    realestate: ['প্রপার্টি', 'এজেন্ট', 'ভিজিট'],
    education: ['কোর্স', 'ইনস্ট্রাক্টর', 'ভর্তি'],
    photographer: ['পোর্টফোলিও', 'প্যাকেজ', 'বুকিং'],
    gym: ['ক্লাস', 'ট্রেইনার', 'মেম্বারশিপ'],
  },
  en: {
    store: ['Shop', 'About', 'Contact'],
    landing: [],
    restaurant: ['Menu', 'About', 'Reserve'],
    service: ['Services', 'Team', 'Book'],
    marketplace: ['Categories', 'Deals', 'Track Order'],
    healthcare: ['Doctors', 'Services', 'Appointment'],
    realestate: ['Properties', 'Agent', 'Visit'],
    education: ['Courses', 'Instructors', 'Enroll'],
    photographer: ['Portfolio', 'Packages', 'Booking'],
    gym: ['Classes', 'Trainers', 'Membership'],
  },
};

const BRAND_BY_TYPE = {
  bn: {
    landing: 'আপনার দোকান',
    store: 'আপনার ব্র্যান্ড',
    restaurant: 'স্পাইস রুট',
    service: 'ব্লিস বিউটি',
    marketplace: 'শপ মার্ট',
    healthcare: 'প্রিভেন্টা',
    realestate: 'হোমকোয়েস্ট',
    education: 'লার্ন প্ল্যানেট',
    photographer: 'ক্যানভাস',
    gym: 'ফিটজোন',
  },
  en: {
    landing: 'Your Shop',
    store: 'Your Brand',
    restaurant: 'Spice Route',
    service: 'Bliss Beauty',
    marketplace: 'Shop Mart',
    healthcare: 'Preventa',
    realestate: 'HomeQuest',
    education: 'LearnPlanet',
    photographer: 'Canvas',
    gym: 'FitZone',
  },
};

const PreviewPanel = ({
  type,
  features,
  accent,
  device,
  setDevice,
  cart,
  onAdd,
  onPlace,
  placing,
  orderId,
  previewRef,
  lang = 'bn',
  mobileVisible = true,
  onEditMobile,
  onGetQuote,
}) => {
  const current = getType(type);
  const enabledExtras = current.extras.filter((e) => features[e.key]).length;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const host = HOST_BY_TYPE[type];
  const navMap = NAV_BY_TYPE[lang] || NAV_BY_TYPE.bn;
  const nav = navMap[type] || [];
  const brandMap = BRAND_BY_TYPE[lang] || BRAND_BY_TYPE.bn;
  const brand = brandMap[type] || (lang === 'en' ? 'Brand' : 'ব্র্যান্ড');

  const renderSections = () => {
    if (type === 'landing') {
      return (
        <>
          {features.countdown && <CountdownBanner accent={accent} />}
          {features.freeShipping && <FreeShippingBar accent={accent} />}
          <LandingHero accent={accent} />
          {features.trust && <TrustBadges accent={accent} />}
          {features.stockCounter && <StockCounter accent={accent} />}
          {features.features && <FeatureList accent={accent} />}
          {features.productSpecs && <ProductSpecs accent={accent} />}
          {features.sizeChart && <SizeChart accent={accent} />}
          {features.beforeAfter && <BeforeAfter accent={accent} />}
          {features.comparison && <ComparisonTable accent={accent} />}
          {features.bundleOffer && <BundleOffer accent={accent} />}
          {features.gifts && <FreeGifts accent={accent} />}
          {features.reviews && <WhatsAppReviews />}
          {features.videoReviews && <VideoTestimonials accent={accent} />}
          {features.qa && <QA accent={accent} />}
          {features.faq && <FAQ accent={accent} />}
          {features.paymentMethods && <PaymentMethods accent={accent} />}
          {features.referral && <ReferralBanner accent={accent} />}
          <OrderForm accent={accent} onPlace={onPlace} placing={placing} />
          {features.cod && <CODConfirmation accent={accent} orderId={orderId} />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'store') {
      return (
        <>
          <HeroSection accent={accent} />
          <ProductGrid accent={accent} onAdd={onAdd} />
          {features.checkout && (
            <CheckoutSection accent={accent} cart={cart} onPlace={onPlace} placing={placing} />
          )}
          {features.cod && <CODConfirmation accent={accent} orderId={orderId} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'restaurant') {
      return (
        <>
          <RestaurantHero accent={accent} />
          {features.specials && <SpecialsSection accent={accent} />}
          <MenuSection accent={accent} />
          {features.gallery && <GallerySection accent={accent} />}
          {features.reservation && <ReservationForm accent={accent} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'service') {
      return (
        <>
          <ServiceHero accent={accent} />
          <ServicesList accent={accent} />
          {features.pricing && <PricingSection accent={accent} />}
          {features.booking && <BookingForm accent={accent} />}
          {features.team && <TeamSection accent={accent} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'marketplace') {
      return (
        <>
          <MarketplaceHero accent={accent} />
          <CategoryGrid accent={accent} />
          {features.hotDeals && <HotDeals accent={accent} />}
          <FeaturedProducts accent={accent} />
          {features.combos && <ComboBundles accent={accent} />}
          {features.trackOrder && <TrackOrder accent={accent} />}
          {features.appDownload && <AppDownload accent={accent} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'healthcare') {
      return (
        <>
          <HealthcareHero accent={accent} />
          <DoctorsList accent={accent} />
          <HealthServices accent={accent} />
          {features.appointment && <AppointmentBooking accent={accent} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'realestate') {
      return (
        <>
          <RealEstateHero accent={accent} />
          <PropertyListings accent={accent} />
          <AgentContact accent={accent} />
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'education') {
      return (
        <>
          <EducationHero accent={accent} />
          <CoursesList accent={accent} />
          {features.instructors && <InstructorsList accent={accent} />}
          {features.enrollBanner && <EnrollmentBanner accent={accent} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'photographer') {
      return (
        <>
          <PhotoHero accent={accent} />
          <PortfolioGallery accent={accent} />
          <ShootPackages accent={accent} />
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    if (type === 'gym') {
      return (
        <>
          <GymHero accent={accent} />
          <ClassSchedule accent={accent} />
          <MembershipPlans accent={accent} />
          {features.gymTrial && <GymTrial accent={accent} />}
          {features.testimonials && <Testimonials />}
          <Footer accent={accent} />
        </>
      );
    }
    return null;
  };

  return (
    <main
      className={`${mobileVisible ? 'flex' : 'hidden'} md:flex flex-1 h-full md:p-6 p-4 md:pl-0 flex-col gap-4 overflow-hidden`}
    >
      {/* Toolbar — slim on mobile (one row, icon-only device toggle), full on desktop. */}
      <div className="preview-toolbar glass rounded-xl md:rounded-2xl p-1.5 md:p-2.5 flex items-center justify-between gap-2 md:gap-3">
        <div className="flex items-center gap-1.5 md:gap-2 md:px-1.5 min-w-0">
          {onEditMobile && (
            <button
              onClick={onEditMobile}
              className="md:hidden shrink-0 w-8 h-8 rounded-md border border-white/15 text-white/85 hover:bg-white/5 grid place-items-center"
              title={t(lang, 'mobileEditConfig')}
            >
              <span className="text-base leading-none">←</span>
            </button>
          )}
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 hidden md:inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 hidden md:inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 hidden md:inline-block" />
          <span className="text-[11.5px] md:text-[12px] text-white/55 md:ml-2 truncate min-w-0">
            {host}
          </span>
          <span
            className="ml-2 hidden md:inline text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: `${accent}22`, color: accent }}
          >
            {tr(current, 'name', lang)}
          </span>
        </div>
        <div className="shrink-0 flex items-center gap-1 p-0.5 md:p-1 rounded-lg border border-white/10 bg-white/[0.02]">
          {[
            { v: 'desktop', icon: 'monitor', label: t(lang, 'desktop') },
            { v: 'mobile', icon: 'phone', label: t(lang, 'mobile') },
          ].map((d) => (
            <button
              key={d.v}
              onClick={() => setDevice(d.v)}
              title={d.label}
              className={`flex items-center gap-1.5 text-[12px] font-semibold w-8 h-8 md:w-auto md:h-auto md:px-2.5 md:py-1.5 rounded-md transition-colors justify-center ${
                device === d.v ? 'bg-white text-gray-900' : 'text-white/65 hover:text-white'
              }`}
            >
              <Icon name={d.icon} className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Device frame */}
      <div className="flex-1 min-h-0 grid place-items-center overflow-hidden">
        <div
          className={`device-shell relative w-full h-full mx-auto ${
            device === 'desktop' ? 'pv-landscape-on-mobile' : ''
          }`}
          style={{ maxWidth: device === 'mobile' ? '390px' : '1200px' }}
        >
          <div
            className="relative h-full w-full rounded-[28px] border border-white/10 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{ background: '#fff' }}
          >
            {device === 'desktop' ? (
              <div className="h-9 px-4 flex items-center gap-2 border-b border-gray-100 bg-gray-50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="ml-3 text-[11.5px] text-gray-500 bg-white border border-gray-200 rounded-md px-2 py-0.5">
                  🔒 {host}
                </div>
              </div>
            ) : (
              <div className="h-7 grid place-items-center bg-gray-900 text-white">
                <div className="w-20 h-3 rounded-full bg-black/60" />
              </div>
            )}

            {/* Site nav */}
            <div
              className="px-5 md:px-8 py-3 flex items-center justify-between border-b"
              style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center gap-2 font-display font-extrabold text-gray-900">
                <span
                  className="w-6 h-6 rounded-md grid place-items-center"
                  style={{ background: accent }}
                >
                  <Icon name={current.icon} className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-[14.5px]">{brand}</span>
              </div>
              <div className="flex items-center gap-3 text-[12.5px] text-gray-600">
                {nav.map((n) => (
                  <span key={n} className="hidden md:inline hover:text-gray-900 cursor-pointer">
                    {n}
                  </span>
                ))}
                {type === 'landing' && (
                  <a
                    href="tel:01XXXXXXXXX"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1.5 font-semibold"
                    style={{ color: accent }}
                  >
                    <Icon name="phone" className="w-3.5 h-3.5" />
                    01XXX-XXXXXX
                  </a>
                )}
                {type === 'store' && (
                  <button className="relative grid place-items-center w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-50">
                    <Icon name="cart" className="w-4 h-4 text-gray-700" />
                    {cartCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 text-[10px] font-bold text-white rounded-full w-4 h-4 grid place-items-center"
                        style={{ background: accent }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable preview body */}
            <div
              ref={previewRef}
              className="absolute inset-x-0 bottom-0 top-[calc(36px+57px)] overflow-auto nice-scroll preview-surface"
            >
              {renderSections()}
            </div>

            {features.whatsapp && <WhatsAppFloat />}

            {/* Mobile-only floating Get-Quote button — bottom-left so it doesn't
                conflict with the WhatsApp button at bottom-right. */}
            {onGetQuote && (
              <button
                onClick={onGetQuote}
                aria-label={t(lang, 'ctaButton')}
                title={t(lang, 'ctaButton')}
                className="md:hidden absolute left-3 bottom-3 z-30 group"
              >
                <span className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11.5px] font-semibold px-2.5 py-1 rounded-md bg-white text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {t(lang, 'ctaButton')}
                </span>
                <span
                  className="relative grid place-items-center w-12 h-12 rounded-full text-white shadow-xl pulse-ring"
                  style={{ background: accent }}
                >
                  <Icon name="cod" className="w-6 h-6" />
                </span>
              </button>
            )}

            {/* Landing-only floating overlays */}
            {type === 'landing' && features.liveOrders && <LiveOrders accent={accent} />}
            {type === 'landing' && features.spinWin && <SpinToWin accent={accent} />}
            {type === 'landing' && features.newsletter && <NewsletterPopup accent={accent} />}
            {type === 'landing' && features.stickyCTA && <StickyCTA accent={accent} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PreviewPanel;
