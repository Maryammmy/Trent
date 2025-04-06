import SelectSkeleton from "@/components/skeleton/SelectSkeleton";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Select from "@/components/ui/Select";
import { IPropertyType } from "@/interfaces";
import { PropertyNameInputs } from "@/types";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";


interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
  propertyTypes: IPropertyType[];
}
const PropertyTypeSelector = ({ control, errors, propertyTypes }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-dark">{t("property_type")}</label>
      {!propertyTypes ? (
        <SelectSkeleton />
      ) : propertyTypes?.length ? (
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={propertyTypes?.map((propertyType: IPropertyType) => ({
                value: propertyType?.id,
                label: propertyType?.title,
              }))}
              className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
            />
          )}
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          No property type found
        </p>
      )}
      {errors["category_id"] && (
        <InputErrorMessage msg={errors["category_id"]?.message} />
      )}
    </div>
  );
};

export default PropertyTypeSelector;
