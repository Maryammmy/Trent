import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { IChangeMobile } from "@/interfaces/accountSettings";
import { uid, currentLanguage } from "@/constants";

export const useUserAPI = () => {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: () =>
      baseAPI.get(`user_api/u_get_data.php?lang=${currentLanguage}&uid=${uid}`),
    enabled: !!uid,
  });
};
export const updateUserAPI = (payload: FormData) => {
  return baseAPIForm.post("user_api/u_profile_edit.php", payload);
};
export const changeMobileAPI = (payload: IChangeMobile) => {
  return baseAPI.post("user_api/u-change-mobile.php", payload);
};
