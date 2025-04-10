import * as yup from "yup";

export const updatePropertySchema = yup.object().shape({
  uid: yup.string().required("user id is required"),
  prop_id: yup.string().required("property id is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+$/, "Price must be a valid number")
    .test("price-range", "Price must be between 50 and 250,000", (value) => {
      const numValue = Number(value);
      return numValue >= 50 && numValue <= 250000;
    }),
  beds_count: yup
    .string()
    .required("Number of beds is required")
    .matches(/^\d+$/, "Beds must be a valid number")
    .test("min", "Beds must be at least 1", (value) => Number(value) >= 1)
    .test("max", "Beds cannot exceed 20", (value) => Number(value) <= 20),
  bathrooms_count: yup
    .string()
    .required("Number of bathrooms is required")
    .matches(/^\d+$/, "Bathrooms must be a valid number")
    .test("min", "Bathrooms must be at least 1", (value) => Number(value) >= 1)
    .test("max", "Bathrooms cannot exceed 20", (value) => Number(value) <= 20),
  sqft: yup
    .string()
    .required("Totaal area is required")
    .matches(/^\d+$/, "Totaal area must be a valid number")
    .test(
      "min",
      "Totaal area must be at least 5",
      (value) => Number(value) >= 5
    )
    .test(
      "max",
      "Totaal area cannot exceed 2000",
      (value) => Number(value) <= 2000
    ),
  security_deposit: yup
    .string()
    .required("Security deposit is required")
    .matches(/^\d+$/, "Security deposit must be a valid number")
    .test(
      "security-deposit-range",
      "Security deposit must be between 50 and 250,000",
      (value) => {
        const numValue = Number(value);
        return numValue >= 50 && numValue <= 250000;
      }
    ),
  guest_count: yup
    .string()
    .required("People limit is required")
    .matches(/^\d+$/, "People limit must be a valid number"),
  min_days: yup
    .string()
    .required("Minimum days is required")
    .matches(/^\d+$/, "Minimum days must be a valid number")
    .test(
      "min-less-than-max",
      "Minimum days cannot be greater than Maximum days",
      function (value) {
        const { max_days } = this.parent;
        return !max_days || Number(value) <= Number(max_days);
      }
    ),

  max_days: yup
    .string()
    .required("Maximum days is required")
    .matches(/^\d+$/, "Maximum days must be a valid number")
    .test(
      "max-days-range",
      "Maximum days must be between 1 and 1000",
      (value) => {
        return Number(value) >= 1 && Number(value) <= 1000;
      }
    )
    .test(
      "max-greater-than-min",
      "Maximum days cannot be less than Minimum days",
      function (value) {
        const { min_days } = this.parent;
        return !min_days || Number(value) >= Number(min_days);
      }
    ),
  facilities: yup.array().min(1, "Facilities are required").required(),
  category_id: yup.string().required("Property type is required"),
  maps_url: yup
    .string()
    .url("Invalid Google Maps URL")
    .required("Google Maps URL is required"),
  government_id: yup.string().required("Government is required"),
  period: yup.string().required("Period is required"),
  city_en: yup.string().required("City (English) is required"),
  city_ar: yup.string().required("City (Arabic) is required"),
  title_en: yup
    .string()
    .min(10, "Title must be at least 10 characters.")
    .max(100, "Title may not be greater than 100 characters.")
    .required("Title (English) is required"),
  title_ar: yup
    .string()
    .min(10, "Title must be at least 10 characters.")
    .max(100, "Title may not be greater than 100 characters.")
    .required("Title (Arabic) is required"),
  compound_en: yup.string(),
  compound_ar: yup.string(),
  address_en: yup.string().required("Address (English) is required"),
  address_ar: yup.string().required("Address (Arabic) is required"),
  floor_en: yup.string().required("Floor (English) is required"),
  floor_ar: yup.string().required("Floor (Arabic) is required"),
  description_en: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description (English) is required"),
  description_ar: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description (Arabic) is required"),
  guest_rules_en: yup
    .string()
    .min(10, "Guest rules must be at least 10 characters")
    .max(500, "Guest rules must be less than 500 characters")
    .required("Guest rules (English) are required"),
  guest_rules_ar: yup
    .string()
    .min(10, "Guest rules must be at least 10 characters")
    .max(500, "Guest rules must be less than 500 characters")
    .required("Guest rules (Arabic) are required"),
  cancellation_policy_id: yup
    .string()
    .required("Cancellation policy is required"),
  images: yup
    .array()
    .min(3, "At least three images are required")
    .required("Images are required"),
  video: yup.mixed<File | string>(),
});
