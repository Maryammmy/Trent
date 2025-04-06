import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Select from "@/components/ui/Select";
import { IPeriod } from "@/interfaces";
import { PropertyNameInputs } from "@/types";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
  periods: IPeriod[];
}
function PeriodSelector({ control, errors, periods }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-dark">{t("period")}</label>
      {!periods ? (
        <SelectSkeleton />
      ) : periods?.length ? (
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={periods?.map((period: IPeriod) => ({
                value: period?.id,
                label: period?.name,
              }))}
              className="border py-3 px-2 bg-white rounded-md focus:border-2 focus:border-primary outline-none"
            />
          )}
        />
      ) : (
        <p className="border bg-white py-3 px-2 rounded-md">No period found</p>
      )}
      {errors["period"] && (
        <InputErrorMessage msg={errors["period"]?.message} />
      )}
    </div>
  );
}

export default PeriodSelector;
