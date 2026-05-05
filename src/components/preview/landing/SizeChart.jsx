import { SIZE_CHART } from '../../../data/content.js';
import { useT } from '../../../lang/LangContext.jsx';

const SizeChart = ({ accent }) => {
  const t = useT();
  return (
    <section className="section-in px-5 md:px-8 py-7 bg-white">
      <div className="text-center mb-4">
        <div className="inline-block text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${accent}18`, color: accent }}>
          {t('sizeBadge')}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mt-2">{t('sizeTitle')}</h2>
        <p className="text-[12px] text-gray-500 mt-1">{t('sizeUnitPrefix')} ({SIZE_CHART.unit})</p>
      </div>
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-200">
        <table className="w-full text-[12px] md:text-[13px]">
          <thead>
            <tr style={{ background: `${accent}10`, color: accent }}>
              <th className="px-3 py-2.5 text-left font-extrabold">{t('sizeColSize')}</th>
              <th className="px-3 py-2.5 text-right font-extrabold">{t('sizeColChest')}</th>
              <th className="px-3 py-2.5 text-right font-extrabold">{t('sizeColWaist')}</th>
              <th className="px-3 py-2.5 text-right font-extrabold hidden md:table-cell">{t('sizeColLength')}</th>
              <th className="px-3 py-2.5 text-right font-extrabold hidden md:table-cell">{t('sizeColShoulder')}</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.rows.map((r, i) => (
              <tr key={r.size} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                <td className="px-3 py-2.5 font-extrabold text-gray-900">{r.size}</td>
                <td className="px-3 py-2.5 text-right text-gray-700">{r.chest}</td>
                <td className="px-3 py-2.5 text-right text-gray-700">{r.waist}</td>
                <td className="px-3 py-2.5 text-right text-gray-700 hidden md:table-cell">{r.length}</td>
                <td className="px-3 py-2.5 text-right text-gray-700 hidden md:table-cell">{r.shoulder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center text-[11px] text-gray-500 mt-3">
        {t('sizeFooter')}
      </div>
    </section>
  );
};

export default SizeChart;
