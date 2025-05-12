import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import Cookies from "js-cookie";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
export const useNotificationsAPI = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      baseAPI.get(
        `user_api/notifications/u_get_all_notifications.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
    refetchInterval: 10000,
  });
};
