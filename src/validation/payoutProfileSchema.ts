import * as yup from "yup";

const optionalStringWithLength = (
  min: number,
  max: number,
  minMsg: string,
  maxMsg: string
) =>
  yup.string().when([], {
    is: (val: string) => Boolean(val),
    then: (schema) => schema.min(min, minMsg).max(max, maxMsg),
    otherwise: (schema) => schema,
  });
export const PayoutProfileSchema = yup.object().shape({
  uid: yup.string().required("User id is required"),
  method_id: yup.string().required("Payment method is required"),
  bank_account_number: optionalStringWithLength(
    10,
    50,
    "The bank account number must be at least 10 characters.",
    "The bank account number may not be greater than 50 characters."
  ),
  bank_name: optionalStringWithLength(
    3,
    200,
    "The bank name must be at least 3 characters.",
    "The bank name may not be greater than 200 characters."
  ),
  full_name: optionalStringWithLength(
    10,
    100,
    "The full name must be at least 10 characters.",
    "The full name may not be greater than 100 characters."
  ),
  wallet_number: yup.string(),
  name: yup
    .string()
    .required("Profile name is required")
    .min(3, "The profile name must be at least 3 characters.")
    .max(50, "The profile name may not be greater than 50 characters."),
  lang: yup.string().required("Language is required"),
});
