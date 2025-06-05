import * as yup from "yup";

const noOnlyNumbers = /^[^0-9]*$/;

const optionalStringWithLength = (
  min: number,
  max: number,
  minKey: string,
  maxKey: string
) =>
  yup
    .string()
    .trim()
    .matches(noOnlyNumbers, "field_no_numbers")
    .test("length-check", minKey, (val) => {
      if (!val) return true;
      return val.length >= min;
    })
    .test("length-check-max", maxKey, (val) => {
      if (!val) return true;
      return val.length <= max;
    });

export const PayoutProfileSchema = yup.object().shape({
  uid: yup.string().required("User id is required"),
  method_id: yup.string().required("method_id_required"),
  bank_account_number: yup
    .string()
    .trim()
    .matches(/^\d{10,50}$/, {
      message: "bank_account_number_validation",
      excludeEmptyString: true,
    }),
  bank_name: optionalStringWithLength(3, 200, "bank_name_min", "bank_name_max"),
  full_name: optionalStringWithLength(
    10,
    100,
    "full_name_min",
    "full_name_max"
  ),
  wallet_number: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, {
      message: "wallet_number_validation",
      excludeEmptyString: true,
    }),
  profile_name: yup
    .string()
    .trim()
    .required("profile_name_required")
    .min(3, "profile_name_min")
    .max(50, "profile_name_max")
    .matches(noOnlyNumbers, "profile_name_no_numbers"),
  lang: yup.string().required("Language is required"),
});
