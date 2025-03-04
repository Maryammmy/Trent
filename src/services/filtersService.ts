import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";

const currentLanguage = localStorage.getItem("i18nextLng");
export const useFiltersAPI = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: () =>
      baseAPI.get(`user_api/u_get_filters_api.php?lang=${currentLanguage}`),
    refetchInterval: 10000,
  });
};
