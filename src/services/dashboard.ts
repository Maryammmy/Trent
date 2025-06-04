import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { currentLanguage, uid } from "@/constants";

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
