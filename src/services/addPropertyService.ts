import { IPropertyData } from "../interfaces/property";
import toast from "react-hot-toast";
import { ApiError } from "../interfaces";
import { addPropertyAPI } from "./propertyService";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HostingContext } from "../context/HostingContext";

const propertyData = (images: File[], video?: File | null): IPropertyData => {
  const uid = Cookies.get("user_id");
  const cancellationPolicy = sessionStorage.getItem("cancellation_policy");
  return {
    uid: uid || "",
    category_id: sessionStorage.getItem("category_id") || "",
    guest_count: Number(sessionStorage.getItem("guest_count")),
    beds_count: Number(sessionStorage.getItem("beds_count")),
    bathrooms_count: Number(sessionStorage.getItem("bathrooms_count")),
    sqft: Number(sessionStorage.getItem("sqft")),
    maps_url: JSON.parse(sessionStorage.getItem("maps_url") || '""'),
    facilities: sessionStorage.getItem("facilities") || "[]",
    images,
    title_en: sessionStorage.getItem("title_en") || "",
    title_ar: sessionStorage.getItem("title_ar") || "",
    description_en: sessionStorage.getItem("description_en") || "",
    description_ar: sessionStorage.getItem("description_ar") || "",
    city_en: sessionStorage.getItem("city_en") || "",
    city_ar: sessionStorage.getItem("city_ar") || "",
    government_id: sessionStorage.getItem("government_id") || "",
    ...(sessionStorage.getItem("compound_en") && {
      compound_en: sessionStorage.getItem("compound_en") || undefined,
    }),
    ...(sessionStorage.getItem("compound_ar") && {
      compound_ar: sessionStorage.getItem("compound_ar") || undefined,
    }),
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
    cancellation_policy_id: cancellationPolicy
      ? JSON.parse(cancellationPolicy)?.id
      : "",
    ...(video && { video }),
  };
};

const formData = (images: File[], video?: File | null) => {
  const property = propertyData(images, video);
  console.log(property);
  const formData = new FormData();
  for (const [key, value] of Object.entries(property)) {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    } else if (key === "video" && value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};
export const useSendDataToAPI = () => {
  const { t } = useTranslation();
  const { selectedImages, selectedVideo, setSelectedImages, setSelectedVideo } =
    useContext(HostingContext);
  const sendDataToAPI = async (): Promise<boolean> => {
    try {
      const payload = formData(selectedImages, selectedVideo);
      for (const [, value] of payload.entries()) {
        if (!value || value === "[]" || !selectedImages.length) {
          toast.error(t("missing_required_fields"));
          return false;
        }
      }
      const response = await addPropertyAPI(payload);
      console.log(response);
      if (response?.data?.response_code === 201) {
        toast.success(response?.data?.response_message);
        setSelectedImages([]);
        setSelectedVideo(null);
      }
      return true;
    } catch (error) {
      const customError = error as ApiError;
      const errorMessage =
        customError?.response?.data?.response_message ||
        t("something_went_wrong");
      toast.error(errorMessage);
      console.log(error);
      return false;
    }
  };

  return { sendDataToAPI };
};
