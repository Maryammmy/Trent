import { ApiError } from "@/interfaces";
import { t } from "i18next";
import toast from "react-hot-toast";
export function handleErrorMessage(error: unknown) {
  const customError = error as ApiError;
  const errorMessage =
    customError?.response?.data?.response_message || t("something_went_wrong");
  toast.error(errorMessage);
}
