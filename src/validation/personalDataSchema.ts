import * as yup from "yup";

export const personalDataSchema = yup.object().shape({
  uid: yup.string().required("user id is required"),
  full_name: yup
    .string()
    .min(5, "The name must be at least 5 characters.")
    .max(30, "The name may not be greater than 30 characters.")
    .required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  pro_img: yup.mixed<File | string>().required("Image is required"),
});
