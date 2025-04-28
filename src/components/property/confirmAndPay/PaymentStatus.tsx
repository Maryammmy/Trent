import { capitalize } from "@/utils/storeUserChat";
import { useTranslation } from "react-i18next";
interface IProps {
  referenceNumber: string;
  orderStatus: string;
  paymentAmount: string;
  paymentMethodFromUrl: string;
}
const PaymentStatus = ({
  referenceNumber,
  orderStatus,
  paymentAmount,
  paymentMethodFromUrl,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-md shadow-sm border mt-5">
      <h4 className="text-xl font-semibold mb-2 text-primary">
        {t("payment_status")}
      </h4>
      <p className="font-medium">
        <strong>{t("reference_number")}:</strong> {referenceNumber}
      </p>
      <p className="font-medium">
        <strong>{t("order_status")}:</strong> {capitalize(orderStatus)}
      </p>
      <p className="font-medium">
        <strong>{t("amount")}:</strong> {paymentAmount} {t("price_per_night")}
      </p>
      <p className="font-medium">
        <strong>{t("payment_method")}:</strong>{" "}
        {paymentMethodFromUrl === "PayUsingCC"
          ? "Card"
          : paymentMethodFromUrl === "PayAtFawry"
          ? "Fawry pay"
          : "Wallet"}
      </p>
    </div>
  );
};

export default PaymentStatus;
