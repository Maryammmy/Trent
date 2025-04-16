import * as Yup from "yup";

export const loginSchema = Yup.object({
  mobile: Yup.string()
    .trim()
    .required("Phone number is required.")
    .matches(/^\d+$/, "The phone number must contain only digits."),
  ccode: Yup.string().trim().required("Country code is required."),
  password: Yup.string().trim().required("Password is required."),
});
