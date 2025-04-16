import * as yup from "yup";

const noOnlyNumbers = /^[^0-9]*$/;
const optionalStringWithLength = (
  min: number,
  max: number,
  minMsg: string,
  maxMsg: string
) =>
  yup
    .string()
    .trim()
    .matches(noOnlyNumbers, "This field cannot contain numbers")
    .test("length-check", minMsg, (val) => {
      if (!val) return true;
      return val.length >= min;
    })
    .test("length-check-max", maxMsg, (val) => {
      if (!val) return true;
      return val.length <= max;
    });

export const PayoutProfileSchema = yup.object().shape({
  uid: yup.string().required("User id is required"),
  method_id: yup.string().required("Payment method is required"),
  bank_account_number: yup
    .string()
    .trim()
    .matches(/^\d{10,50}$/, {
      message:
        "The bank account number must contain between 10 and 50 digits only",
      excludeEmptyString: true,
    }),
  bank_name: optionalStringWithLength(
    3,
    200,
    "The bank name must be at least 3 characters",
    "The bank name may not be greater than 200 characters"
  ),
  full_name: optionalStringWithLength(
    10,
    100,
    "The full name must be at least 10 characters",
    "The full name may not be greater than 100 characters"
  ),
  wallet_number: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, {
      message: "The wallet number must contain exactly 10 digits",
      excludeEmptyString: true,
    }),
  name: yup
    .string()
    .trim()
    .required("Profile name is required")
    .min(3, "The profile name must be at least 3 characters")
    .max(50, "The profile name may not be greater than 50 characters")
    .matches(noOnlyNumbers, "This field cannot contain numbers"),
  lang: yup.string().required("Language is required"),
});
