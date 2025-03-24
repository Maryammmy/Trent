import * as Yup from "yup";

export const loginSchema = Yup.object({
  mobile: Yup.string()
    .required("Phone number is required.")
    .matches(/^\d+$/, "The phone number must contain only digits."),
  ccode: Yup.string().required("Country code is required."),
  password: Yup.string().required("Password is required."),
});
