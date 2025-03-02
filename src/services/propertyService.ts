// import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { IPropertyData } from "../interfaces/propertyInterface";

// export const usePropertyAPI = (id: number) => {
//   return useQuery({
//     queryKey: ["property", id],
//     queryFn: () =>
//       baseAPI.get(`user_api/u_property_details.php?lang=ar&prop_id=${id}`),
//     refetchInterval: 5000,
//     enabled: !!id,
//   });
// };
export const getPropertyAPI = (id: number) => {
  const response = baseAPI.post("user_api/u_property_details.php?lang=ar", {
    prop_id: id,
  });
  return response;
};
export const addPropertyAPI = (payload: IPropertyData) => {
  const response = baseAPI.post("user_api/u_property_add.php", payload);
  return response;
};
export const editPropertyAPI = (payload: IPropertyData) => {
  const response = baseAPI.post("user_api/u_property_edit.php", payload);
  return response;
};
