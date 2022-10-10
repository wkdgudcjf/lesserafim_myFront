import axios from "axios";

// ::TODO
// change this to our service API to find country by IP
async function changeLanguage(callback) {
  callback("ko");
}

const ipLangDetector = {
  type: "languageDetector",
  name: "ipLangDetector",
  async: true,
  init: function (services, detectorOptions, i18nextOptions) {
    /* use services and options */
  },
  detect: function (callback) {
    const lang = window.localStorage.getItem("i18nLang");
    lang ? callback(lang) : changeLanguage(callback);
  },
  cacheUserLanguage: function (lng) {
    window.localStorage.setItem("i18nLang", lng);
  },
};

export default ipLangDetector;
