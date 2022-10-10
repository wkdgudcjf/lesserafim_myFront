import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ko from "./locales/ko";
import ja from "./locales/ja";
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      ko: ko,
      ja: ja,
    },

    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  }, (err,t)=>{
    const lng = i18n.language?.toLowerCase();
    if (lng.length > 2) {
      i18n.changeLanguage(lng.slice(0,2));
    }
    document.getElementsByTagName('html')[0].setAttribute("lang", i18n.language);
  })

export default i18n;
