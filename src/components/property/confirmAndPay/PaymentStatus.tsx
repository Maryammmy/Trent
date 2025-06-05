import { capitalize } from "@/utils/capitalize";
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
    <div className="p-4 rounded-lg border mt-5 font-semibold">
      <h4 className="text-xl mb-2 text-primary">{t("payment_status")}</h4>
      <p className="">
        <span>{t("reference_number")}:</span> {referenceNumber}
      </p>
      <p>
        <span>{t("order_status")}:</span> {capitalize(orderStatus)}
      </p>
      <p>
        <span>{t("amount")}:</span> {paymentAmount} {t("EGP")}
      </p>
      <p>
        <span>{t("payment_method")}:</span>{" "}
        {paymentMethodFromUrl === "PayUsingCC"
          ? "Card"
          : paymentMethodFromUrl === "PayAtFawry"
          ? "Fawry pay"
          : "E-Wallet"}
      </p>
    </div>
  );
};

export default PaymentStatus;
