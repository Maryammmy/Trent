import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { currentLanguage } from "@/constants";

export const useFiltersAPI = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: () =>
      baseAPI.get(`user_api/u_get_filters_api.php?lang=${currentLanguage}`),
  });
};
export const useCascadeFiltersAPI = (
  governmentId: string,
  cityName?: string,
  compoundName?: string
) => {
  return useQuery({
    queryKey: ["cascadeFilters", governmentId, cityName, compoundName],
    queryFn: () =>
      baseAPI.get(
        `user_api/u_cascade_filters_api.php?government_id=${governmentId}${
          cityName ? `&city_name=${cityName}` : ""
        }${
          compoundName ? `&compound_name=${compoundName}` : ""
        }&lang=${currentLanguage}`
      ),
    enabled: !!governmentId,
  });
};

export const useGovernmentsAPI = () => {
  return useQuery({
    queryKey: ["governments"],
    queryFn: () =>
      baseAPI.get(`user_api/u_government_list.php?lang=${currentLanguage}`),
  });
};
export const usePropertyTypesAPI = () => {
  return useQuery({
    queryKey: ["propertyTypes"],
    queryFn: () =>
      baseAPI.get(`user_api/u_category_list.php?lang=${currentLanguage}`),
  });
};
export const useFacilitiesAPI = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: () =>
      baseAPI.get(`user_api/u_facility_list.php?lang=${currentLanguage}`),
  });
};
