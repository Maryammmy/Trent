import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import Cookies from "js-cookie";
import { CurrentLanguage } from "../types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
export const useUserAPI = () => {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: () =>
      baseAPI.get(`user_api/u_get_data.php?lang=${currentLanguage}&uid=${uid}`),
    refetchInterval: 5000,
    enabled: !!uid,
  });
};
export const updateUserAPI = (payload: FormData) => {
  return baseAPIForm.post("user_api/u_profile_edit.php", payload);
};
