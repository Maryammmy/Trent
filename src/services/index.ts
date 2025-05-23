import axios from "axios";

// import baseUrl
export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const fawryBaseUrl = import.meta.env.VITE_FAWRY_BASE_URL;
export const mymemoryTranslatedBaseUrl = import.meta.env
  .VITE_MYMEMORY_TRANSLATED_BASE_URL;

// create an instance of the axios server
export const baseAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// use this baseAPI form only if you are visiting a form data or uploading a document
export const baseAPIForm = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// create an instance of the axios server
export const fawryBaseAPI = axios.create({
  baseURL: fawryBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// create an instance of the axios server
export const mymemorytranslatedBaseAPI = axios.create({
  baseURL: mymemoryTranslatedBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
