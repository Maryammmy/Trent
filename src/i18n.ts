import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });
let currentLanguage = localStorage.getItem("i18nextLng");

if (!currentLanguage) {
  currentLanguage = "en";
  localStorage.setItem("i18nextLng", currentLanguage);
} else {
  currentLanguage = currentLanguage.split("-")[0];
}

export default i18n;
