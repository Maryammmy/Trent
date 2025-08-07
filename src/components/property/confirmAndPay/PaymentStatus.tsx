import { capitalize } from "@/utils/capitalize";
import { useTranslation } from "react-i18next";
interface IProps {
  referenceNumber: string;
  orderStatus: string;
  paymentMethodFromUrl: string;
}
const PaymentStatus = ({
  referenceNumber,
  orderStatus,
  paymentMethodFromUrl,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-lg border mt-5 font-semibold">
      <h4 className="text-xl mb-2 text-primary">{t("payment_status")}</h4>
      {paymentMethodFromUrl === "PayAtFawry" && referenceNumber && (
        <p className="">
          <span>{t("reference_number")}:</span> {referenceNumber}
        </p>
      )}
      <p>
        <span>{t("order_status")}:</span>{" "}
        <span
          className={
            orderStatus === "PAID" ? "text-green-600" : "text-yellow-400"
          }
        >
          {capitalize(orderStatus)}
        </span>
      </p>
      <p>
        <span>{t("payment_method")}:</span>{" "}
        {paymentMethodFromUrl === "MWALLET"
          ? "E-Wallet"
          : paymentMethodFromUrl === "PayAtFawry"
          ? "Fawry pay"
          : "Card"}
      </p>
    </div>
  );
};

export default PaymentStatus;
