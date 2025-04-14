import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { CurrentLanguage } from "@/types";
import { IVerifyProperty } from "@/interfaces/booking";

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
export const verifyPropertyAPI = (payload: IVerifyProperty) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/booking/u_verify_property_rules.php",
    formData
  );
  return response;
};
