import * as yup from "yup";

export const updatePropertySchema = yup.object().shape({
  uid: yup.string().required("user id is required"),
  prop_id: yup.string().required("property id is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+$/, "Price must be a valid number"),
  beds: yup
    .string()
    .required("Number of beds is required")
    .matches(/^\d+$/, "Beds must be a valid number"),
  bathroom: yup
    .string()
    .required("Number of bathrooms is required")
    .matches(/^\d+$/, "Bathrooms must be a valid number"),
  sqft: yup
    .string()
    .required("Square footage is required")
    .matches(/^\d+$/, "Square footage must be a valid number"),
  security_deposit: yup
    .string()
    .required("Security deposit is required")
    .matches(/^\d+$/, "Security deposit must be a valid number"),
  plimit: yup
    .string()
    .required("People limit is required")
    .matches(/^\d+$/, "People limit must be a valid number"),
  min_days: yup
    .string()
    .required("Minimum days is required")
    .matches(/^\d+$/, "Minimum days must be a valid number"),
  max_days: yup
    .string()
    .required("Maximum days is required")
    .matches(/^\d+$/, "Maximum days must be a valid number"),
  facility: yup.array().min(1, "Facilities are required").required(),
  ptype: yup.string().required("Property type is required"),
  google_maps_url: yup
    .string()
    .url("Invalid Google Maps URL")
    .required("Google Maps URL is required"),
  government: yup.string().required("Government field is required"),
  city_en: yup.string().required("City (English) is required"),
  city_ar: yup.string().required("City (Arabic) is required"),
  title_en: yup.string().required("Title (English) is required"),
  title_ar: yup.string().required("Title (Arabic) is required"),
  compound_name_en: yup
    .string()
    .required("Compound Name (English) is required"),
  compound_name_ar: yup.string().required("Compound Name (Arabic) is required"),
  address_en: yup.string().required("Address (English) is required"),
  address_ar: yup.string().required("Address (Arabic) is required"),
  floor_en: yup.string().required("Floor (English) is required"),
  floor_ar: yup.string().required("Floor (Arabic) is required"),
  price_type: yup.string().required("Price type is required"),
  description_en: yup.string().required("Description (English) is required"),
  description_ar: yup.string().required("Description (Arabic) is required"),
  guest_rules_en: yup.string().required("Guest Rules (English) are required"),
  guest_rules_ar: yup.string().required("Guest Rules (Arabic) are required"),
  images: yup
    .array()
    .min(3, "At least three images are required")
    .required("Images are required"),
  video: yup
    .array()
    .min(1, "At least one video is required")
    .required("Videos are required"),
});
