import { useTranslation } from "react-i18next";
import DynamicTitle from "../../components/accountSettings/DynamicTitle";
import {
  useTransactionHistoryAPI,
  useTrentWalletAPI,
} from "@/services/walletService";
import PropertyHostingSkeleton from "@/components/skeleton/PropertyHostingSkeleton";
import Transaction from "@/components/credits/Transaction";
import { ITransaction } from "@/interfaces/credits";

function Credits() {
  const { t } = useTranslation();
  const { data } = useTrentWalletAPI();
  const TrentCredits = data?.data?.data?.Wallet_balance;
  const { data: transactionHistoryData } = useTransactionHistoryAPI();
  const transactions: ITransaction[] =
    transactionHistoryData?.data?.data?.Wallet_history;
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
        <h3 className="pt-6 text-stone-700 text-lg md:text-xl font-bold">
          {t("transaction_history")}
        </h3>
        <div className="pt-6 grid grid-cols-1 gap-5 sm:gap-8">
          {!transactions ? (
            <PropertyHostingSkeleton cards={4} />
          ) : transactions?.length ? (
            transactions?.map((transaction) => (
              <Transaction transaction={transaction} key={transaction?.id} />
            ))
          ) : (
            <div className="flex justify-center items-center text-lg h-[50vh] text-dark font-medium w-full">
              {t("no_transaction_history")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Credits;
