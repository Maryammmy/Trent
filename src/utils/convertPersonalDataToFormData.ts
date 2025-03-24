import { IUpdateUser } from "../interfaces/accountSettingsInterface";
export const convertPersonalDataToFormData = (data: IUpdateUser) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue;
    if (key === "pro_img" && value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
};
