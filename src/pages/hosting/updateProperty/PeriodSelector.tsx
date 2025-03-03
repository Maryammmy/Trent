import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "../../../components/ui/Select";
import { PropertyNameInputs } from "../../../types";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
import { ISelectOption } from "../../../interfaces";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
  periods: ISelectOption[];
}
function PeriodSelector({ control, errors, periods }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-white">{t("period")}</label>
      <Controller
        name="period"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={periods}
            className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
          />
        )}
      />
      {errors["period"] && (
        <InputErrorMessage msg={errors["period"]?.message} />
      )}
    </div>
  );
}

export default PeriodSelector;
