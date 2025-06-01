import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { IReadyPayoutProperties } from "@/interfaces/payouts";
import Image from "../ui/Image";
import { baseURL } from "@/services";
import Input from "../ui/Input";
interface IProps {
  property: IReadyPayoutProperties;
  isSelected: boolean;
  onToggle: (id: number) => void;
}
function PayoutReadyProperty({ property, isSelected, onToggle }: IProps) {
  const { id, title, check_in, check_out, total, image } = property;
  const { t } = useTranslation();
  return (
    <Button className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border p-4 rounded-2xl text-start font-semibold">
      <div className="relative h-14 w-14 overflow-hidden rounded-md shrink-0">
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]" />
        <div className="w-full h-full">
          <Image
            imageUrl={baseURL + image?.[0]?.img}
            alt="property"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          <div className="flex flex-wrap gap-1">
            <h5>{t("check_in")}:</h5>
            <span>{check_in}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <h5>{t("check_out")}:</h5>
            <span>{check_out}</span>
          </div>
          <p className="text-lg">
            <span>{t("total")} :</span> {total} {t("EGP")}
          </p>
        </div>
        <div>
          <Input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(Number(id))}
            className="accent-primary w-4 h-4"
          />
        </div>
      </div>
    </Button>
  );
}

export default PayoutReadyProperty;
