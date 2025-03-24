import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .matches(/^[A-Za-z\s]+$/, "The name must contain only letters.")
    .min(3, "The name must be at least 3 characters.")
    .max(50, "The name may not be greater than 50 characters."),
  email: Yup.string().email("Invalid email address"),
  mobile: Yup.string()
    .required("Phone number is required.")
    .matches(/^\d+$/, "The phone number must contain only digits."),
  ccode: Yup.string().required("Country code is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*\d).{6,}$/,
      "The password must be at least 6 characters and include a number."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("password")],
      "The confirmPassword and password fields must match."
    ),
});
