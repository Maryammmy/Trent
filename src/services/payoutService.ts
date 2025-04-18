import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import Cookies from "js-cookie";
import { CurrentLanguage } from "@/types";
import {
  ICreatePayoutProfile,
  ICreatePayoutRequest,
  IDeletePayoutProfile,
} from "@/interfaces/payout";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
export const usePaymentMethodAPI = () => {
  return useQuery({
    queryKey: ["paymentMethod"],
    queryFn: () =>
      baseAPI.get(
        `user_api/payout/get_method_payout.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
  });
};
export const createPayoutsProfileAPI = (payload: ICreatePayoutProfile) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/payout/add_profile_payout.php",
    formData
  );
  return response;
};
export const usePayoutPropertiesAPI = () => {
  return useQuery({
    queryKey: ["payoutProperties"],
    queryFn: () =>
      baseAPI.get(
        `user_api/payout/get_ready_properties_payout.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
  });
};
export const createPayoutsRequestAPI = (payload: ICreatePayoutRequest) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post("user_api/payout/add_payout.php", formData);
  return response;
};
export const deletePayoutProfileAPI = (payload: IDeletePayoutProfile) => {
  const response = baseAPI.delete("user_api/payout/delete_profile_payout.php", {
    data: payload,
  });
  return response;
};
