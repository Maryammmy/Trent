import * as Yup from "yup";

export const forgetPasswordSchema = Yup.object({
  mobile: Yup.string()
    .required("Phone number is required.")
    .matches(/^\d+$/, "The phone number must contain only digits."),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*\d).{6,}$/,
      "The password must be at least 6 characters and include a number."
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("password")],
      "The confirmPassword and password fields must match."
    ),
});
