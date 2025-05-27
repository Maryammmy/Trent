import { useTranslation } from "react-i18next";
import DynamicTitle from "../../components/accountSettings/DynamicTitle";
import { useTrentWalletAPI } from "@/services/walletService";
import PropertyHostingSkeleton from "@/components/skeleton/PropertyHostingSkeleton";

function Credits() {
  const { t } = useTranslation();
  const { data } = useTrentWalletAPI();
  const TrentCredits = data?.data?.data?.Wallet_balance;
  return (
    <div className="max-w-6xl mx-auto py-5 md:py-10 px-5 xl:px-0">
      <DynamicTitle title="trent_credits" />
      <div className="py-6">
        {!TrentCredits ? (
          <PropertyHostingSkeleton cards={1} />
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col gap-2">
            <h2 className="text-lg text-dark font-semibold">
              {t("total_credits")}
            </h2>
            <p className="font-bold text-2xl text-stone-700">
              {TrentCredits} {t("EGP")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Credits;
