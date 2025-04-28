import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import { paymentMethods } from "@/data/booking";
import { useTranslation } from "react-i18next";
interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentMethod: string;
}
function PaymentMethodSelector({ paymentMethod, onChange }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      {paymentMethods.map((method) => (
        <label
          key={method.value}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Input
            type="radio"
            name="paymentMethod"
            value={method.value}
            checked={paymentMethod === method.value}
            onChange={onChange}
            className="accent-primary w-5 h-5"
          />
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="font-medium">{t(method.label)}</span>
            <div className="flex gap-3">
              {method.icons.map((icon, index) => (
                <div key={index} className="w-8 h-8 rounded-sm overflow-hidden">
                  <Image
                    imageUrl={icon}
                    alt={`${method.label} icon`}
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
