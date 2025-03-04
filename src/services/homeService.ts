import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { IHomeDataParams } from "../interfaces/landingInterface";
import { CurrentLanguage } from "../interfaces";
import qs from "qs";

const currentLanguage = localStorage.getItem("i18nextLng") as CurrentLanguage;

export const useHomeDataAPI = (
  params?: IHomeDataParams,
  enabled: boolean = false
) => {
  const queryParamsObject: Record<
    string,
    string | string[] | number | boolean
  > = {
    lang: currentLanguage,
    ...params,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(queryParamsObject).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
  return useQuery({
    queryKey: ["home", filteredParams],
    queryFn: () =>
      baseAPI.get("user_api/u_home_data.php", {
        params: filteredParams,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "brackets" }), // ✅ يرسل [1,2] بشكل صحيح
      }),
    refetchInterval: 10000,
    enabled,
  });
};
