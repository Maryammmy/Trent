import axios from "axios";

// import baseUrl
export const baseURL = import.meta.env.VITE_API_BASE_URL;

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
