import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { IToggleProperty } from "../interfaces/property";
import { uid, currentLanguage } from "@/constants";
export const usePropertyAPI = (id: string | undefined) => {
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
export const addPropertyAPI = async (payload: FormData) => {
  const response = await baseAPIForm.post(
    "user_api/u_property_add.php",
    payload
  );
  return response;
};
export const editPropertyAPI = async (payload: FormData) => {
  const response = await baseAPIForm.post(
    "user_api/u_property_edit.php",
    payload
  );
  return response;
};
export const togglePropertyAPI = async (payload: IToggleProperty) => {
  const response = await baseAPI.post(
    "user_api/u_property_toggle_favorite.php",
    payload
  );
  return response;
};
export const publishPropertyAPI = async (prop_id: string) => {
  const response = await baseAPI.delete(
    "user_api/u_property_toggle_publishing.php",
    {
      data: { uid, prop_id },
    }
  );
  return response;
};
