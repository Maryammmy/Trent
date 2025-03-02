import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "../../../components/ui/Select";
import { priceType } from "../../../data";
import { PropertyNameInputs } from "../../../types";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
}
function PricingTypeSelector({ control, errors }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-white">{t("pricing_type")}</label>
      <Controller
        name="price_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={priceType}
            className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
          />
        )}
      />
      {errors["price_type"] && (
        <InputErrorMessage msg={errors["price_type"]?.message} />
      )}
    </div>
  );
}

export default PricingTypeSelector;
