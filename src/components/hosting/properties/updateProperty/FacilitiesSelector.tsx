import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import { IFacility } from "@/interfaces";
import { baseURL } from "@/services";
import { PropertyNameInputs } from "@/types";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
  facilities: IFacility[];
}
function FacilitiesSelector({ control, errors, facilities }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-dark">{t("facilities")}</label>
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
                    className="accent-primary w-4 h-4"
                  />
                  <div className="w-6 h-6 rounded-md overflow-hidden">
                    <Image
                      imageUrl={baseURL + facility?.img}
                      alt="facility"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{facility?.title}</span>
                </label>
              ))}
            </div>
          )}
        />
      ) : (
        <p className="border bg-white py-3 px-2 rounded-md">
          {t("no_facilities_found")}
        </p>
      )}
      {errors["facilities"] && (
        <InputErrorMessage msg={errors["facilities"]?.message} />
      )}
    </div>
  );
}

export default FacilitiesSelector;
