import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Load translations from backend
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass to React
  .init({
    fallbackLng: "en", // Default language if detection fails
    debug: false, // Optional: to see the debug logs in the console
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translations
    },
    detection: {
      order: ["localStorage", "navigator"], // Check in localStorage first, then navigator
      caches: ["localStorage"], // Only store the language in localStorage
      lookupLocalStorage: "i18nextLng", // Custom key to store language
    },
  });

export default i18n;
