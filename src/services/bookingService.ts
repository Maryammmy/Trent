import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { CurrentLanguage } from "@/types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
export const usePropertyInfoAPI = (id: string | undefined) => {
  return useQuery({
    queryKey: ["propertyInfo", id],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_property_info.php?lang=${currentLanguage}&prop_id=${id}`
      ),
    enabled: !!id,
  });
};
