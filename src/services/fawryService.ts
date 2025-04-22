import { IInitFawry } from "@/interfaces/faawry";
import { baseAPI, fawryBaseAPI } from ".";
import { useQuery } from "@tanstack/react-query";

export const useFawryCredentialsAPI = () => {
  return useQuery({
    queryKey: ["fawryCredentials"],
    queryFn: () =>
      baseAPI.get("user_api/payout/u_fawry_payout_credentials.php"),
    refetchInterval: 10000,
  });
};
export const initFawryPaymentAPI = (payload: IInitFawry) => {
  const response = fawryBaseAPI.post(
    "https://atfawry.fawrystaging.com/fawrypay-api/api/payments/init",
    payload
  );
  return response;
};
