import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("name_required")
    .matches(/^[A-Za-z\s]+$/, "name_letters_only_sign_up")
    .min(3, "name_min_length_sign_up")
    .max(50, "name_max_length_sign_up"),
  email: Yup.string().trim().email("invalid_email"),
  mobile: Yup.string()
    .trim()
    .required("phone_number_required")
    .matches(/^\d+$/, "phone_number_digits"),
  ccode: Yup.string().trim().required("country_code_required"),
  password: Yup.string()
    .trim()
    .required("password_required")
    .matches(/^(?=.*\d).{6,}$/, "password_requirements"),
  confirmPassword: Yup.string()
    .trim()
    .required("confirm_password_required")
    .oneOf([Yup.ref("password")], "passwords_must_match"),
});
