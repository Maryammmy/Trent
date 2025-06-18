import { ITransaction } from "@/interfaces/credits";
import { formatDate } from "@/utils/formatDate";
import { useTranslation } from "react-i18next";

interface IProps {
  transaction: ITransaction;
}

function Transaction({ transaction }: IProps) {
  const { t } = useTranslation();
  const isPositive = transaction.status === "Adding";

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-2">
      {/* Icon */}
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full 
        ${
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        {isPositive ? "+" : "-"}
      </div>

      {/* Status + Date */}
      <div className="flex flex-col items-start flex-1 px-4 text-dark">
        <span className="font-medium">
          {transaction.status === "Withdraw" ? t("withdrawal") : t("deposit")}
        </span>
        <span className="text-sm text-gray-400">
          {formatDate(new Date(transaction.Created_at))}
        </span>
      </div>
      {/* Amount */}
      <div
        className={`font-bold text-lg ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? `+$${transaction.amt}` : `-$${transaction.amt}`}
      </div>
    </div>
  );
}

export default Transaction;
