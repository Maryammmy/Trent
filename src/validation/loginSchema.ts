import * as Yup from "yup";

export const loginSchema = Yup.object({
  mobile: Yup.string()
    .trim()
    .required("phone_number_required")
    .matches(/^\d+$/, "phone_number_digits"),
  ccode: Yup.string().trim().required("country_code_required"),
  password: Yup.string().trim().required("password_required"),
});
