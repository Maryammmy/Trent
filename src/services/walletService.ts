import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";
import Cookies from "js-cookie";

const uid = Cookies.get("user_id");
export const useTrentWalletAPI = () => {
  return useQuery({
    queryKey: ["TrentWallet"],
    queryFn: () =>
      baseAPI.get(`user_api/Wallet/u_wallet_balance.php?uid=${uid}`),
    enabled: !!uid,
  });
};
