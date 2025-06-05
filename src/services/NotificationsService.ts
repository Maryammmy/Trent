import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { currentLanguage, uid } from "@/constants";
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
export const updateNotificationAPI = async (id: string) => {
  const formData = new FormData();
  Object.entries({ uid, lang: currentLanguage, id }).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/notifications/u_update_notification.php",
    formData
  );
  return response;
};
