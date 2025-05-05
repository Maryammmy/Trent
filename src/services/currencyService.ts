import { baseAPI } from ".";

export const currencyRateAPI = (currency: string) => {
  return baseAPI.get(
    `user_api/currency/get_currency_rate.php?currency=${currency}`
  );
};
