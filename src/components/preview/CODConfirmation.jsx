import Icon from '../Icon.jsx';
import { useT } from '../../lang/LangContext.jsx';

const CODConfirmation = ({ accent, orderId }) => {
  const t = useT();
  return (
    <section className="section-in px-5 md:px-8 py-8 bg-white text-center">
      <div
        className="mx-auto w-16 h-16 rounded-full grid place-items-center pulse-ring"
        style={{ background: `${accent}18`, color: accent }}
      >
        <Icon name="check" className="w-8 h-8" stroke={2.4} />
      </div>
      <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-4">
        {t('codSuccess')}
      </h2>
      <p className="text-[13px] text-gray-600 mt-1.5 max-w-sm mx-auto">
        {t('codThanksPrefix')}<span className="font-semibold text-gray-800">#{orderId}</span>{t('codThanksSuffix')}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-gray-600 bg-gray-50 border border-gray-100 px-3 py-2 rounded-full">
        <Icon name="truck" className="w-4 h-4" />
        {t('codSmsNote')}
      </div>
    </section>
  );
};

export default CODConfirmation;
