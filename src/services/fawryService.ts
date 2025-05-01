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
  const response = fawryBaseAPI.post("fawrypay-api/api/payments/init", payload);
  return response;
};
export const fawryPaymentStatusAPI = (
  merchantCode: string | null,
  merchantRefNumber: string | null,
  signature: string
) => {
  const response = fawryBaseAPI.get(
    `https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/status/v2?merchantCode=${merchantCode}&merchantRefNumber=${merchantRefNumber}
&signature=${signature}`
  );
  return response;
};
