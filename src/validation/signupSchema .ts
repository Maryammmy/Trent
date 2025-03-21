import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(3, "The name must be at least 3 characters.")
    .max(50, "The name may not be greater than 50 characters.")
    .required("name is required."),
  email: Yup.string().email("Invalid email address"),
  mobile: Yup.string()
    .matches(/^\d+$/, "The phone number must contain only digits.")
    .required("Phone number is required."),
  ccode: Yup.string().required("Country code is required."),
  password: Yup.string()
    .matches(
      /^(?=.*\d).{6,}$/,
      "The password must be at least 6 characters and include a number."
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "The confirmPassword and password fields must match."
    )
    .required("Confirm password is required."),
});
