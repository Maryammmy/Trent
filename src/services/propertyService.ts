import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { IToggleProperty } from "../interfaces/propertyInterface";
import { CurrentLanguage } from "../types";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
export const usePropertyAPI = (id: string, uid?: string) => {
  return useQuery({
    queryKey: ["property", id, uid],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_property_details.php?lang=${currentLanguage}&prop_id=${id}${
          uid ? `&uid=${uid}` : ""
        }`
      ),
    refetchInterval: 10000,
    enabled: !!id,
  });
};
export const addPropertyAPI = (payload: FormData) => {
  return baseAPIForm.post("user_api/u_property_add.php", payload);
};
export const editPropertyAPI = (payload: FormData) => {
  const response = baseAPIForm.post("user_api/u_property_edit.php", payload);
  return response;
};
export const togglePropertyAPI = (payload: IToggleProperty) => {
  const response = baseAPI.post(
    "user_api/u_property_toggle_favorite.php",
    payload
  );
  return response;
};
