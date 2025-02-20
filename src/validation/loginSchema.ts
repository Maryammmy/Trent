import * as Yup from "yup";

export const loginSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^\d+$/, "The phone number must contain only digits.")
    .required("Phone number is required."),
  ccode: Yup.string().required("Country code is required."),
  password: Yup.string().required("Password is required."),
});
