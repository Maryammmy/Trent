import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";

export const useUserDashboardAPI = () => {
  return useQuery({
    queryKey: ["userDashboard"],
    queryFn: () => baseAPI.get(`user_api/u_dashboard.php`),
  });
};
