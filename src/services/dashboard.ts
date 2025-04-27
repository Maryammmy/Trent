import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";

import Cookies from "js-cookie";
import { CurrentLanguage } from "@/types";
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
export const useUserDashboardAPI = () => {
  return useQuery({
    queryKey: ["userDashboard"],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_dashboard.php?lang=${currentLanguage}&uid=${uid}`
      ),
    enabled: !!uid,
  });
};
