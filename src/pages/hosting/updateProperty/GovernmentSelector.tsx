import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import { IGovernement } from "../../../interfaces";
import { PropertyNameInputs } from "../../../types";
import Select from "../../../components/ui/Select";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
  governments: IGovernement[];
}
function GovernmentSelector({ control, errors, governments }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-dark">{t("government")}</label>
      {!governments ? (
        <SelectSkeleton />
      ) : governments?.length ? (
        <Controller
          name="government_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={governments?.map((gov: IGovernement) => ({
                value: gov?.id,
                label: gov?.name,
              }))}
              className="border py-3 px-2 bg-white rounded-md focus:border-2 focus:border-primary outline-none"
            />
          )}
        />
      ) : (
        <p className="border bg-white py-3 px-2 rounded-md">
          No government found
        </p>
      )}
      {errors["government_id"] && (
        <InputErrorMessage msg={errors["government_id"]?.message} />
      )}
    </div>
  );
}

export default GovernmentSelector;
