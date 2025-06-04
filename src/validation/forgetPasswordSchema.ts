import * as Yup from "yup";

export const forgetPasswordSchema = Yup.object({
  ccode: Yup.string().trim().required("country_code_required"),
  mobile: Yup.string()
    .trim()
    .required("phone_required")
    .matches(/^\d+$/, "phone_digits_only"),
  password: Yup.string()
    .trim()
    .required("password_required")
    .matches(/^(?=.*\d).{6,}$/, "password_invalid"),
  confirm_password: Yup.string()
    .trim()
    .required("confirm_password_required")
    .oneOf([Yup.ref("password")], "confirm_password_must_match"),
});
