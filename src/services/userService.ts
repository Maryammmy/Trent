import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import Cookies from "js-cookie";
import { CurrentLanguage } from "../types";
import { IChangeMobile } from "@/interfaces/accountSettings";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
export const useUserAPI = () => {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: () =>
      baseAPI.get(`user_api/u_get_data.php?lang=${currentLanguage}&uid=${uid}`),
    refetchInterval: 10000,
    enabled: !!uid,
  });
};
export const updateUserAPI = (payload: FormData) => {
  return baseAPIForm.post("user_api/u_profile_edit.php", payload);
};
export const changeMobileAPI = (payload: IChangeMobile) => {
  return baseAPI.post("user_api/u-change-mobile.php", payload);
};
