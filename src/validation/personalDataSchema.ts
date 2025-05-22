import * as yup from "yup";

export const personalDataSchema = yup.object().shape({
  uid: yup.string().trim().required("user id is required"),
  full_name: yup
    .string()
    .trim()
    .min(3, "name_min_length")
    .max(50, "name_max_length")
    .required("name_required"),
  email: yup.string().trim().email("invalid_email"),
  gender: yup.string().trim().required("gender_required"),
  pro_img: yup.mixed<File | string>(),
});
