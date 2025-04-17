import { CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
interface IProps {
  onClick: () => void;
}
function PayoutTransaction({ onClick }: IProps) {
  const { t } = useTranslation();
  const status = "Completed";
  return (
    <Button
      onClick={onClick}
      className="flex items-center text-start  gap-5 sm:gap-8 font-medium border px-3 sm:px-4 py-2 rounded-2xl"
    >
      <div>
        <CreditCard size={40} className="text-primary" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <span>14-5-2025</span>
          <span>10:00 AM</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <p className="">Bank transfer</p>
          <span
            className={`${
              status === "Completed"
                ? "text-green-600"
                : status === "Failed"
                ? "text-red-600"
                : "text-dark"
            } font-semibold`}
          >
            {status}
          </span>
        </div>
        <div>
          <span className="font-bold">500 {t("price_per_night")}</span>
        </div>
      </div>
    </Button>
  );
}

export default PayoutTransaction;
