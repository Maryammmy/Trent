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
      // Customizing language detection behavior
      lookupFromPathIndex: 0, // Only consider the first part (like "en" instead of "en-US")
      // Remove language region (e.g., "en-US" => "en")
    },
  });

// Get the language from localStorage or use a default "en"
let currentLanguage = localStorage.getItem("i18nextLng") || "en";
if (currentLanguage.includes("-")) {
  currentLanguage = currentLanguage.split("-")[0]; // Extract "en" from "en-US"
}
localStorage.setItem("i18nextLng", currentLanguage);

export default i18n;
