import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { IHomeDataParams } from "../interfaces/landingInterface";
import { CurrentLanguage } from "../types";

const currentLanguage = localStorage.getItem("i18nextLng") as CurrentLanguage;

export const useHomeDataAPI = (
  params?: IHomeDataParams,
  enabled: boolean = false
) => {
  const queryParamsObject: Record<
    string,
    string | number[] | number | boolean
  > = {
    lang: currentLanguage,
    ...params,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(queryParamsObject).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !Number.isNaN(value) &&
        value !== 0
    )
  );
  return useQuery({
    queryKey: ["home", filteredParams],
    queryFn: () =>
      baseAPI.get("user_api/u_home_data.php", {
        params: {
          ...filteredParams,
          facilities: JSON.stringify(filteredParams.facilities),
        },
      }),
    refetchInterval: 10000,
    enabled,
  });
};
