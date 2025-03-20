import { IPropertyData } from "../interfaces/property/propertyInterface";
import toast from "react-hot-toast";
import { ApiError } from "../interfaces";
import getVideoFromIndexedDB from "../utils/getVideoFromIndexedDB";
import { addPropertyAPI } from "./propertyService";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const propertyData = async (): Promise<IPropertyData> => {
  const video = await getVideoFromIndexedDB();
  const uid = Cookies.get("user_id");
  return {
    category_id: sessionStorage.getItem("category_id") || "",
    guest_count: Number(sessionStorage.getItem("guest_count")),
    beds_count: Number(sessionStorage.getItem("beds_count")),
    bathrooms_count: Number(sessionStorage.getItem("bathrooms_count")),
    sqft: Number(sessionStorage.getItem("sqft")),
    maps_url: JSON.parse(sessionStorage.getItem("maps_url") || '""'),
    facilities: sessionStorage.getItem("facilities") || "[]",
    images: JSON.parse(sessionStorage.getItem("images") || "[]"),
    title_en: sessionStorage.getItem("title_en") || "",
    title_ar: sessionStorage.getItem("title_ar") || "",
    description_en: sessionStorage.getItem("description_en") || "",
    description_ar: sessionStorage.getItem("description_ar") || "",
    city_en: sessionStorage.getItem("city_en") || "",
    city_ar: sessionStorage.getItem("city_ar") || "",
    government_id: sessionStorage.getItem("government_id") || "",
    compound_en: sessionStorage.getItem("compound_en") || "",
    compound_ar: sessionStorage.getItem("compound_ar") || "",
    address_en: sessionStorage.getItem("address_en") || "",
    address_ar: sessionStorage.getItem("address_ar") || "",
    floor_en: sessionStorage.getItem("floor_en") || "",
    floor_ar: sessionStorage.getItem("floor_ar") || "",
    min_days: Number(sessionStorage.getItem("min_days")),
    max_days: Number(sessionStorage.getItem("max_days")),
    period: sessionStorage.getItem("period") || "",
    price: Number(sessionStorage.getItem("price")),
    security_deposit: Number(sessionStorage.getItem("security_deposit")),
    guest_rules_en: sessionStorage.getItem("guest_rules_en") || "",
    guest_rules_ar: sessionStorage.getItem("guest_rules_ar") || "",
    uid: uid || "",
    video: video || "",
  };
};

const formData = async () => {
  const property = await propertyData();
  const formData = new FormData();
  for (const [key, value] of Object.entries(property)) {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((base64) => {
        if (base64.startsWith("data:")) {
          const [meta, base64Data] = base64.split(",");
          formData.append(
            `${key}[]`,
            new Blob(
              [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
              {
                type: meta.split(":")[1].split(";")[0],
              }
            )
          );
        }
      });
    } else if (key === "video" && value.startsWith("data:")) {
      const [meta, base64] = value.split(",");
      formData.append(
        key,
        new Blob([Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))], {
          type: meta.split(":")[1].split(";")[0],
        })
      );
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};
export const useSendDataToAPI = () => {
  const { t } = useTranslation();
  const sendDataToAPI = async (): Promise<boolean> => {
    try {
      const payload = await formData();
      const response = await addPropertyAPI(payload);
      console.log(response);

      if (response?.data?.response_code === 201) {
        toast.success(response?.data?.response_message);
      }
      return true;
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
      return false;
    }
  };

  return { sendDataToAPI };
};
