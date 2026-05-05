import Icon from '../Icon.jsx';
import { useT } from '../../lang/LangContext.jsx';

const WhatsAppFloat = () => {
  const t = useT();
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="absolute right-3 bottom-3 md:right-4 md:bottom-4 z-30 group"
      aria-label="Order on WhatsApp"
    >
      <span className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11.5px] font-semibold px-2.5 py-1 rounded-md bg-white text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        {t('waOrder')}
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

export default WhatsAppFloat;
