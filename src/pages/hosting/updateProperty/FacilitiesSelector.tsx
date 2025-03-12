import { Control, Controller, FieldErrors } from "react-hook-form";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import { PropertyNameInputs } from "../../../types";
import Input from "../../../components/ui/Input";
import { IFacility } from "../../../interfaces";
import { useTranslation } from "react-i18next";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
  facilities: IFacility[];
}
function FacilitiesSelector({ control, errors, facilities }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-white">{t("facilities")}</label>
      {!facilities ? (
        <SelectSkeleton />
      ) : facilities?.length ? (
        <Controller
          name="facilities"
          control={control}
          render={({ field }) => (
            <div className="border py-3 px-2 rounded-md bg-white">
              {facilities?.map((facility: IFacility) => (
                <label
                  key={facility?.id}
                  className="flex items-center gap-2 py-1 font-medium"
                >
                  <Input
                    type="checkbox"
                    checked={field.value?.includes(facility?.id)}
                    onChange={(e) => {
                      const selectedValues = new Set(field.value || []);
                      if (e.target.checked) {
                        selectedValues.add(facility?.id);
                      } else {
                        selectedValues.delete(facility?.id);
                      }
                      field.onChange(Array.from(selectedValues));
                    }}
                    className="accent-dark w-4 h-4"
                  />
                  {facility?.title}
                </label>
              ))}
            </div>
          )}
        />
      ) : (
        <p className="border bg-white py-3 px-2 rounded-md">
          No facilities found
        </p>
      )}
      {errors["facilities"] && (
        <InputErrorMessage msg={errors["facilities"]?.message} />
      )}
    </div>
  );
}

export default FacilitiesSelector;
