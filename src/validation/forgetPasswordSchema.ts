import * as Yup from "yup";

export const forgetPasswordSchema = Yup.object({
  ccode: Yup.string().trim().required("Country code is required."),
  mobile: Yup.string()
    .trim()
    .required("Phone number is required.")
    .matches(/^\d+$/, "The phone number must contain only digits."),
  password: Yup.string()
    .trim()
    .required("Password is required.")
    .matches(
      /^(?=.*\d).{6,}$/,
      "The password must be at least 6 characters and include a number."
    ),
  confirm_password: Yup.string()
    .trim()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("password")],
      "The confirmPassword and password fields must match."
    ),
});
