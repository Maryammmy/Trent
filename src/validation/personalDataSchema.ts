import * as yup from "yup";

export const personalDataSchema = yup.object().shape({
  uid: yup.string().required("user id is required"),
  full_name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  gender: yup.string().required(),
  pro_img: yup.mixed<File | string>().required("Image is required"),
});
