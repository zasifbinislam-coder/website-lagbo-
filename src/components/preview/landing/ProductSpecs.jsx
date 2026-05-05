import { PRODUCT_SPECS } from '../../../data/content.js';
import { useT, useTr } from '../../../lang/LangContext.jsx';

const ProductSpecs = ({ accent }) => {
  const t = useT();
  const tr = useTr();
  return (
    <section className="section-in px-5 md:px-8 py-7" style={{ background: '#fafafa' }}>
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('specsBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('specsTitle')}</h2>
      </div>
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white">
        {PRODUCT_SPECS.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-start gap-3 px-4 py-2.5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'} ${i !== PRODUCT_SPECS.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="text-[12px] font-bold text-gray-600 w-1/3 shrink-0">{tr(s, 'label')}</div>
            <div className="text-[12.5px] text-gray-900 flex-1">{tr(s, 'value')}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSpecs;
