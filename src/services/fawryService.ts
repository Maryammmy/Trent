import { IInitFawry } from "@/interfaces/faawry";
import { fawryBaseAPI } from ".";

export const initFawryPaymentAPI = (payload: IInitFawry) => {
  const response = fawryBaseAPI.post(
    "https://atfawry.fawrystaging.com/fawrypay-api/api/payments/init",
    payload
  );
  return response;
};
