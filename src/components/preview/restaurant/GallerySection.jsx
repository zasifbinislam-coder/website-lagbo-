import { RESTAURANT_GALLERY } from '../../../data/content.js';
import { useT } from '../../../lang/LangContext.jsx';

const GallerySection = ({ accent }) => {
  const t = useT();
  return (
    <section
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#fafafa' }}
    >
      <div className="text-center mb-4">
        <div
          className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {t('galleryBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">
          {t('galleryHeading')}
        </h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {RESTAURANT_GALLERY.map((src, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img loading="lazy" decoding="async"
              src={src}
              alt={`gallery-${i}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              style={{ aspectRatio: i % 5 === 0 ? '1/1' : '1/1' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
