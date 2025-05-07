import * as Yup from "yup";
export const changeMobileSchema = Yup.object().shape({
  // old_mobile: Yup.string()
  //   .required("Old phone number is required")
  //   .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  // .min(10, "Phone number must be at least 10 digits")
  // .max(15, "Phone number must not exceed 15 digits"),
  // old_ccode: Yup.string().required("Country code is required"),
  new_mobile: Yup.string()
    .required("New phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  // .min(10, "Phone number must be at least 10 digits")
  // .max(15, "Phone number must not exceed 15 digits"),
  new_ccode: Yup.string().required("Country code is required"),
});
