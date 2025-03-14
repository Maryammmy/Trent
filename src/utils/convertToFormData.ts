import { PropertyNameInputs } from "../types";

export const convertToFormData = (data: PropertyNameInputs) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((base64) => {
        if (base64.startsWith("data:")) {
          const [meta, base64Data] = base64.split(",");
          const blob = new Blob(
            [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
            { type: meta.split(":")[1].split(";")[0] }
          );
          formData.append(`${key}[]`, blob);
        }
      });
    } else if (
      key === "video" &&
      typeof value === "string" &&
      value.startsWith("data:")
    ) {
      const [meta, base64] = value.split(",");
      const blob = new Blob(
        [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
        { type: meta.split(":")[1].split(";")[0] }
      );
      formData.append(key, blob);
    } else if (key === "facilities" && Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value) {
      formData.append(key, String(value));
    }
  }
  return formData;
};
