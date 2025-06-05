import { baseAPI } from ".";

export const currencyRateAPI = async (currency: string) => {
  const response = await baseAPI.get(
    `user_api/currency/get_currency_rate.php?currency=${currency}`
  );
  return response;
};
