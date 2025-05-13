import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
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
export const useUnreadNotificationsCountAPI = () => {
  return useQuery({
    queryKey: ["unreadNotificationsCount"],
    queryFn: () =>
      baseAPI.get(
        `user_api/notifications/u_get_unseen_notifications_count.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
    refetchInterval: 10000,
  });
};
export const updateNotificationAPI = (id: string) => {
  const formData = new FormData();
  Object.entries({ uid, lang: currentLanguage, id }).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/notifications/u_update_notification.php",
    formData
  );
  return response;
};
