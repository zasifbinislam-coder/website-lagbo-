import { createContext, useContext } from 'react';
import { t as tStr, tr as trItem } from '../data/content.js';

const LangContext = createContext('bn');

export const LangProvider = ({ lang, children }) => (
  <LangContext.Provider value={lang}>{children}</LangContext.Provider>
);

export const useLang = () => useContext(LangContext);

export const useT = () => {
  const lang = useContext(LangContext);
  return (key) => tStr(lang, key);
};

export const useTr = () => {
  const lang = useContext(LangContext);
  return (item, field) => trItem(item, field, lang);
};
