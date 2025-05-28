import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import { paymentMethodsIcons } from "@/data/booking";
import { ICashMethod } from "@/interfaces/payouts";
import { useCashMethodsAPI } from "@/services/payoutsService";
import { useTranslation } from "react-i18next";
interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentMethod: string;
  TrentCredits: string;
}
function PaymentMethodSelector({
  paymentMethod,
  onChange,
  TrentCredits,
}: IProps) {
  const { t } = useTranslation();
  const { data } = useCashMethodsAPI();
  const paymentMethodWithoutIcons: ICashMethod[] =
    data?.data?.data?.cash_in_method_list;
  const paymentMethods = paymentMethodWithoutIcons?.map((method, index) => ({
    ...method,
    icons: paymentMethodsIcons[index] || [],
  }));
  return (
    <div className="flex flex-col gap-4">
      {paymentMethods?.map((method) => (
        <label
          key={method?.key}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Input
            type="radio"
            name="paymentMethod"
            value={method?.key}
            checked={paymentMethod === method?.key}
            onChange={onChange}
            className="accent-primary w-5 h-5 shrink-0"
          />
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="font-medium">
              <span>{t(method?.name)}</span>{" "}
              {method?.key === "TRENT_BALANCE" && (
                <span>{`(${TrentCredits} ${t("EGP")})`}</span>
              )}
            </div>
            <div className="flex gap-3">
              {method.icons.map((icon, index) => (
                <div key={index} className="w-8 h-8 rounded-sm overflow-hidden">
                  <Image
                    imageUrl={icon}
                    alt={`${method?.name} icon`}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}

export default PaymentMethodSelector;
