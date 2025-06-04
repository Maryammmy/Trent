import { DEFAULT_CURRENCY } from "@/constants";

export function getStoredCurrency() {
  const storedCurrency = sessionStorage.getItem("currency");
  try {
    return storedCurrency ? JSON.parse(storedCurrency) : DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}
