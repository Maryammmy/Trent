import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Load translations from backend
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass to React
  .init({
    fallbackLng: "en", // Default language
    debug: false, // Debugging in console
    interpolation: {
      escapeValue: false, // React already escapes
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translations
    },
  });

export default i18n;
