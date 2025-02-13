import { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { TFunction } from "i18next";

export const validateStartDate = (
  newValue: DateValueType,
  endDateValue: DateValueType,
  t: TFunction
): DateValueType | null => {
  const { startDate } = newValue || {};
  const today = new Date().setHours(0, 0, 0, 0);

  if (startDate && new Date(startDate).getTime() < today) {
    toast.error(t("error_Check_in_after_today"));
    return null;
  }

  if (
    startDate &&
    endDateValue?.startDate &&
    new Date(startDate) > new Date(endDateValue.startDate)
  ) {
    toast.error(t("error_check_in"));
    return null;
  }

  return newValue;
};

export const validateEndDate = (
  newValue: DateValueType,
  startDateValue: DateValueType,
  t: TFunction
): DateValueType | null => {
  const { startDate } = newValue || {};
  const today = new Date().setHours(0, 0, 0, 0);

  if (startDate && new Date(startDate).getTime() < today) {
    toast.error(t("error_Check_out_after_today"));
    return null;
  }

  if (
    startDate &&
    startDateValue?.startDate &&
    new Date(startDate) < new Date(startDateValue.startDate)
  ) {
    toast.error(t("error_check_out"));
    return null;
  }

  return newValue;
};
