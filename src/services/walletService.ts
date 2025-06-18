import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import { currentLanguage, uid } from "@/constants";
export const useTrentWalletAPI = () => {
  return useQuery({
    queryKey: ["TrentWallet"],
    queryFn: () =>
      baseAPI.get(`user_api/Wallet/u_wallet_balance.php?uid=${uid}`),
    enabled: !!uid,
  });
};
export const useTransactionHistoryAPI = () => {
  return useQuery({
    queryKey: ["transactionHistory"],
    queryFn: () =>
      baseAPI.get(
        `user_api/Wallet/u_wallet_history.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
  });
};
