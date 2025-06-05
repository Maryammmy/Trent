import { IInitFawry } from "@/interfaces/faawry";
import { baseAPI, fawryBaseAPI } from ".";
import { useQuery } from "@tanstack/react-query";

export const useFawryCredentialsAPI = () => {
  return useQuery({
    queryKey: ["fawryCredentials"],
    queryFn: () =>
      baseAPI.get("user_api/payout/u_fawry_payout_credentials.php"),
  });
};
export const initFawryPaymentAPI = async (payload: IInitFawry) => {
  const response = await fawryBaseAPI.post(
    "fawrypay-api/api/payments/init",
    payload
  );
  return response;
};
