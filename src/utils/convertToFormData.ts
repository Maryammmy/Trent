import { PropertyNameInputs } from "../types";

export const convertToFormData = (data: PropertyNameInputs) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    } else if (key === "video" && value instanceof File) {
      formData.append(key, value);
    } else if (key === "facilities" && Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (key === "existing_images" && Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value) {
      formData.append(key, String(value));
    }
  }
  return formData;
};
