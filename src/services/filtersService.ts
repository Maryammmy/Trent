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
export const useGovernmentsAPI = () => {
  return useQuery({
    queryKey: ["governments"],
    queryFn: () =>
      baseAPI.get(`user_api/u_government.php?lang=${currentLanguage}`),
    refetchInterval: 10000,
  });
};
export const usePropertyTypesAPI = () => {
  return useQuery({
    queryKey: ["propertyTypes"],
    queryFn: () =>
      baseAPI.get(`user_api/u_property_type.php?lang=${currentLanguage}`),
    refetchInterval: 10000,
  });
};
export const useFacilitiesAPI = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: () =>
      baseAPI.get(`user_api/u_facility.php?lang=${currentLanguage}`),
    refetchInterval: 10000,
  });
};
