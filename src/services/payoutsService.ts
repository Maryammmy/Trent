import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import Cookies from "js-cookie";
import { CurrentLanguage } from "@/types";
import {
  ICreatePayoutProfile,
  ICreatePayoutRequest,
} from "@/interfaces/payouts";

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
export const usePayoutProfilesAPI = () => {
  return useQuery({
    queryKey: ["payoutProfiles"],
    queryFn: () =>
      baseAPI.get(`user_api/payout/get_profiles_payout.php?uid=${uid}`),
    enabled: !!uid,
  });
};
export const deletePayoutProfileAPI = (profile_id: string) => {
  const response = baseAPI.delete("user_api/payout/delete_profile_payout.php", {
    data: { uid, profile_id },
  });
  return response;
};
export const useCashMethodsAPI = () => {
  return useQuery({
    queryKey: ["cashMethods"],
    queryFn: () =>
      baseAPI.get(
        `user_api/payout/get_cash_in_method.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
  });
};
