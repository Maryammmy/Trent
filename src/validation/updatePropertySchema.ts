import * as yup from "yup";

export const updatePropertySchema = yup
  .object()
  .shape({
    uid: yup.string().trim().required("User id is required"),
    prop_id: yup.string().trim().required("Property id is required"),
    price: yup
      .string()
      .trim()
      .required("price_required")
      .matches(/^\d+$/, "price_valid")
      .test("price-range", "price_range_validation", (value) => {
        const numValue = Number(value);
        return numValue >= 50 && numValue <= 250000;
      }),
    beds_count: yup
      .string()
      .trim()
      .required("beds_required")
      .matches(/^\d+$/, "beds_valid")
      .test("min", "beds_min", (value) => Number(value) >= 1)
      .test("max", "beds_max", (value) => Number(value) <= 20),
    bathrooms_count: yup
      .string()
      .trim()
      .required("bathrooms_required")
      .matches(/^\d+$/, "bathrooms_valid")
      .test("min", "bathrooms_min", (value) => Number(value) >= 1)
      .test("max", "bathrooms_max", (value) => Number(value) <= 20),
    sqft: yup
      .string()
      .trim()
      .required("sqft_required")
      .matches(/^\d+$/, "sqft_valid")
      .test("min", "sqft_min", (value) => Number(value) >= 5)
      .test("max", "sqft_max", (value) => Number(value) <= 2000),
    security_deposit: yup
      .string()
      .trim()
      .required("security_deposit_required")
      .matches(/^\d+$/, "security_deposit_valid")
      .test("security-deposit-range", "security_deposit_range", (value) => {
        const numValue = Number(value);
        return numValue >= 50 && numValue <= 250000;
      }),
    guest_count: yup
      .string()
      .trim()
      .required("guest_count_required")
      .matches(/^\d+$/, "guest_count_valid"),
    min_days: yup
      .string()
      .trim()
      .required("min_days_required")
      .matches(/^\d+$/, "min_days_valid")
      .test("min-less-than-max", "min_days_lte_max_days", function (value) {
        const { max_days } = this.parent;
        return !max_days || Number(value) <= Number(max_days);
      }),
    max_days: yup
      .string()
      .trim()
      .required("max_days_required")
      .matches(/^\d+$/, "max_days_valid")
      .test("max-days-range", "max_days_range", (value) => {
        return Number(value) >= 1 && Number(value) <= 1000;
      })
      .test("max-greater-than-min", "max_days_gte_min_days", function (value) {
        const { min_days } = this.parent;
        return !min_days || Number(value) >= Number(min_days);
      }),
    facilities: yup.array().min(1, "facilities_required").required(),
    category_id: yup.string().required("category_id_required"),
    maps_url: yup
      .string()
      .trim()
      .url("maps_url_invalid")
      .required("maps_url_required"),
    government_id: yup.string().required("government_id_required"),
    period: yup.string().trim().required("period_required"),
    city_en: yup.string().trim().required("city_en_required"),
    city_ar: yup.string().trim().required("city_ar_required"),
    title_en: yup
      .string()
      .trim()
      .min(10, "title_en_min")
      .max(100, "title_en_max")
      .required("title_en_required"),
    title_ar: yup
      .string()
      .trim()
      .min(10, "title_ar_min")
      .max(100, "title_ar_max")
      .required("title_ar_required"),
    compound_en: yup.string().trim(),
    compound_ar: yup.string().trim(),
    address_en: yup.string().trim().required("address_en_required"),
    address_ar: yup.string().trim().required("address_ar_required"),
    floor_en: yup.string().trim().required("floor_en_required"),
    floor_ar: yup.string().trim().required("floor_ar_required"),
    description_en: yup
      .string()
      .trim()
      .min(50, "description_en_min")
      .max(500, "description_en_max")
      .required("description_en_required"),
    description_ar: yup
      .string()
      .trim()
      .min(50, "description_ar_min")
      .max(500, "description_ar_max")
      .required("description_ar_required"),
    guest_rules_en: yup
      .string()
      .trim()
      .min(10, "guest_rules_en_min")
      .max(500, "guest_rules_en_max")
      .required("guest_rules_en_required"),
    guest_rules_ar: yup
      .string()
      .trim()
      .min(10, "guest_rules_ar_min")
      .max(500, "guest_rules_ar_max")
      .required("guest_rules_ar_required"),
    cancellation_policy_id: yup
      .string()
      .required("cancellation_policy_required"),
    video: yup.mixed(),
    images: yup.array(),
    existing_images: yup.array(),
  })
  .test("min-total-images", "min_total_images_error", function (values) {
    const images = Array.isArray(values.images) ? values.images : [];
    const existingImages = Array.isArray(values.existing_images)
      ? values.existing_images
      : [];
    const totalImages = images.length + existingImages.length;
    if (totalImages < 3) {
      return this.createError({
        path: "images",
        message: "min_total_images_error",
      });
    }
    return true;
  });
