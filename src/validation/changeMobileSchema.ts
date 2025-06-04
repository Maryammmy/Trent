import * as Yup from "yup";

export const changeMobileSchema = Yup.object().shape({
  new_mobile: Yup.string()
    .required("new_mobile_required")
    .matches(/^[0-9]+$/, "new_mobile_digits_only"),
  new_ccode: Yup.string().required("new_ccode_required"),
});
