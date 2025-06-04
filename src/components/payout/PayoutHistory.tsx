import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { IPayoutHistory } from "@/interfaces/payouts";
import Image from "../ui/Image";
import { baseURL } from "@/services";
interface IProps {
  payoutHistory: IPayoutHistory;
}
function PayoutHistory({ payoutHistory }: IProps) {
  const {
    prop_title,
    prop_img,
    total,
    requested_at,
    payout_status,
    cancel_reason,
  } = payoutHistory;
  const { t } = useTranslation();
  return (
    <Button className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border p-4 rounded-2xl text-start font-semibold">
      <div className="relative h-14 w-14 overflow-hidden rounded-md shrink-0">
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]" />
        <div className="w-full h-full">
          <Image
            imageUrl={baseURL + prop_img}
            alt="property"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3>{prop_title}</h3>
        <span>{requested_at}</span>
        <span
          className={`${
            payout_status === "Pending"
              ? "text-yellow-500"
              : payout_status === "Rejected"
              ? "text-red-600"
              : payout_status === "Completed"
              ? "text-green-600"
              : ""
          }`}
        >
          {payout_status}
        </span>
        {payout_status === "Rejected" && cancel_reason && (
          <p>
            {/* <span>{t("cancel_reason")}</span> */}
            {cancel_reason}
          </p>
        )}
        <p className="text-lg">
          <span>{t("total")} :</span> {total} {t("EGP")}
        </p>
      </div>
    </Button>
  );
}

export default PayoutHistory;
