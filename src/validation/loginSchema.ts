import * as Yup from "yup";

export const loginSchema = Yup.object({
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
});
