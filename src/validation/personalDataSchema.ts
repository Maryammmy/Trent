import * as yup from "yup";

export const personalDataSchema = yup.object().shape({
  uid: yup.string().trim().required("user id is required"),
  full_name: yup
    .string()
    .trim()
    .min(3, "The name must be at least 3 characters.")
    .max(50, "The name may not be greater than 50 characters.")
    .required("Full Name is required"),
  email: yup.string().trim().email("Invalid email address"),
  gender: yup.string().trim().required("Gender is required"),
  pro_img: yup.mixed<File | string>(),
});
