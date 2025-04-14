import * as yup from "yup";

export const verifyPropertySchema = yup.object().shape({
  from_date: yup.string().required("Check-in date is required"),
  to_date: yup.string().required("Check-out date is required"),
  guest_counts: yup
    .number()
    .required("Guest count is required")
    .min(1, "You must select at least 1 guest"),
  confirm_guest_rules: yup
    .boolean()
    .required("Guest count is required")
    .oneOf([true], "You must accept the host rules"),
  uid: yup.string().required("User id is required"),
  lang: yup.string().required("Language is required"),
  prop_id: yup.string().required("Property id is required"),
});
