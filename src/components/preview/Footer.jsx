import Icon from '../Icon.jsx';
import { useT, useLang } from '../../lang/LangContext.jsx';

const Footer = ({ accent }) => {
  const t = useT();
  const lang = useLang();
  const year = new Date().getFullYear();
  return (
    <footer
      className="section-in px-5 md:px-8 py-7"
      style={{ background: '#0f172a', color: '#cbd5e1' }}
    >
      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <div className="flex items-center gap-2 font-display font-extrabold text-white text-lg">
            <span
              className="w-7 h-7 rounded-lg grid place-items-center"
              style={{ background: accent }}
            >
              <Icon name="sparkles" className="w-4 h-4 text-white" />
            </span>
            {t('footerBrand')}
          </div>
          <p className="text-[12.5px] mt-2 text-slate-400 max-w-xs">
            {t('footerBrandDesc')}
          </p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-300">
            {t('footerContact')}
          </div>
          <ul className="mt-2 space-y-1.5 text-[12.5px]">
            <li className="flex items-center gap-2">
              <Icon name="phone" className="w-4 h-4" />
              +880 1XXX-XXXXXX
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="w-4 h-4" />
              hello@apnarbrand.shop
            </li>
            <li className="flex items-center gap-2">
              <Icon name="pin" className="w-4 h-4" />
              {t('footerLocation')}
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-300">
            {t('footerFollow')}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {['facebook', 'instagram', 'whatsapp'].map((s) => (
              <a
                key={s}
                className="w-9 h-9 grid place-items-center rounded-lg border border-white/10 hover:border-white/30 transition-colors text-slate-200"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <Icon name={s} className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 mt-4">
            � {lang === 'en' ? year : year.toLocaleString('bn-BD')} {t('footerCopyrightSuffix')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
