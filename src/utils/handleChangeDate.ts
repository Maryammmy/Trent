import { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { t } from "i18next";

export const validateStartDate = (
  newValue: DateValueType,
  endDateValue: DateValueType
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
  minDays?: number,
  maxDays?: number
): DateValueType | null => {
  const { startDate: endDate } = newValue || {};
  const { startDate: startDate } = startDateValue || {};

  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (end < today) {
    toast.error(t("error_Check_out_after_today"));
    return null;
  }

  if (end < start) {
    toast.error(t("error_check_out"));
    return null;
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffInDays =
    Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  const MAX_ALLOWED_DAYS = 180; // أقصى مدة = 6 شهور
  const allowedMaxDays =
    maxDays && maxDays > 0 ? Math.min(maxDays, MAX_ALLOWED_DAYS) : undefined;

  if (typeof minDays === "number" && minDays > 0 && diffInDays < minDays) {
    toast.error(t("error_min_days_stay", { days: minDays }));
    return null;
  }

  if (typeof allowedMaxDays === "number" && diffInDays > allowedMaxDays) {
    toast.error(t("error_max_days_stay", { days: allowedMaxDays }));
    return null;
  }

  return newValue;
};
