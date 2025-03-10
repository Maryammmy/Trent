import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { IPropertyData } from "../interfaces/propertyInterface";
import { CurrentLanguage } from "../types";

const currentLanguage = localStorage.getItem("i18nextLng") as CurrentLanguage;

export const usePropertyAPI = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_property_details.php?lang=${currentLanguage}&prop_id=${id}`
      ),
    refetchInterval: 10000,
    enabled: !!id,
  });
};
export const addPropertyAPI = (formData: FormData) => {
  return baseAPIForm.post("user_api/u_property_add.php", formData);
};

export const editPropertyAPI = (payload: IPropertyData) => {
  const response = baseAPI.post("user_api/u_property_edit.php", payload);
  return response;
};
