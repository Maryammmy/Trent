import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { IHomeDataParams } from "../interfaces/landing";
import { CurrentLanguage } from "../types";
import Cookies from "js-cookie";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
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
          uid,
        },
      }),
    refetchInterval: 10000,
    enabled,
  });
};

export const useAlertAPI = () => {
  return useQuery({
    queryKey: ["alert"],
    queryFn: () => baseAPI.get(`user_api/u_alert.php?lang=${currentLanguage}`),
  });
};
export const useContactUsAPI = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: () => baseAPI.get("user_api/u_contact_us.php"),
  });
};
