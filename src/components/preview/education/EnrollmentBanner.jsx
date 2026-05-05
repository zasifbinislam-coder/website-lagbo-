import Icon from '../../Icon.jsx';
import { useT } from '../../../lang/LangContext.jsx';

const EnrollmentBanner = ({ accent }) => {
  const t = useT();
  const benefits = [t('eduEnrollBenefit1'), t('eduEnrollBenefit2'), t('eduEnrollBenefit3'), t('eduEnrollBenefit4')];
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div
        className="rounded-2xl overflow-hidden grid md:grid-cols-2 max-w-4xl mx-auto"
        style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 60%, #000))` }}
      >
        <div className="p-6 md:p-8 text-white">
          <div className="text-[11px] font-extrabold tracking-wider opacity-90">{t('eduEnrollBadge')}</div>
          <h2 className="font-display text-2xl font-extrabold mt-1.5">{t('eduEnrollHeading')}</h2>
          <p className="text-[13px] opacity-90 mt-1.5">{t('eduEnrollDesc')}</p>
          <ul className="mt-4 space-y-1.5 text-[12.5px]">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Icon name="check" className="w-3.5 h-3.5" stroke={3} />{b}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="p-6 md:p-8 bg-white space-y-2.5">
          <div className="text-[12.5px] font-bold text-gray-700">{t('eduEnrollFormTitle')}</div>
          <input placeholder={t('eduEnrollNamePh')} className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
          <input placeholder={t('eduEnrollPhonePh')} className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
          <input placeholder={t('eduEnrollEmailPh')} className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400" />
          <select className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 bg-white">
            <option>{t('eduEnrollSelectPh')}</option>
            <option>{t('eduEnrollOpt1')}</option>
            <option>{t('eduEnrollOpt2')}</option>
            <option>{t('eduEnrollOpt3')}</option>
          </select>
          <button className="btn-primary w-full text-[13px] font-extrabold py-2.5 rounded-lg">{t('eduEnrollSubmit')}</button>
        </form>
      </div>
    </section>
  );
};

export default EnrollmentBanner;
