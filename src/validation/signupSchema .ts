import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(4, "The name must be at least 4 characters.")
    .max(10, "The name may not be greater than 8 characters.")
    .required("name is required."),
  email: Yup.string().email("Invalid email address"),
  mobile: Yup.string()
    .matches(/^\d+$/, "The phone number must contain only digits.")
    .required("Phone number is required."),
  ccode: Yup.string().required("Country code is required."),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "The confirmPassword and password fields must match."
    )
    .required("Confirm password is required."),
});
