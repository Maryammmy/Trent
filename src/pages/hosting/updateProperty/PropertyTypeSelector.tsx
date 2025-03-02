import { Control, Controller, FieldErrors } from "react-hook-form";
import Select from "../../../components/ui/Select";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import { IPropertyType } from "../../../interfaces";
import { useTranslation } from "react-i18next";
import { PropertyNameInputs } from "../../../types";
import { useGetData } from "../../../hooks/useGetData";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";

interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
}
const currentLanguage = localStorage.getItem("i18nextLng");
const PropertyTypeSelector = ({ control, errors }: IProps) => {
  const { t } = useTranslation();
  const { data: propertyType } = useGetData(
    ["propertyTypeList"],
    `user_api/u_property_type.php?lang=${currentLanguage}`
  );
  const propertyTypeList: IPropertyType[] = propertyType?.data.typelist;
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-white">{t("property_type")}</label>
      {!propertyTypeList ? (
        <SelectSkeleton />
      ) : propertyTypeList.length ? (
        <Controller
          name="ptype"
          control={control}
          defaultValue={propertyTypeList[0]?.id}
          render={({ field }) =>
            propertyTypeList.length === 1 ? (
              <p className="border py-3 px-2 rounded-md bg-white">
                {propertyTypeList[0]?.title}
              </p>
            ) : (
              <Select
                {...field}
                options={propertyTypeList.map(
                  (propertyType: IPropertyType) => ({
                    value: propertyType.id,
                    label: propertyType.title,
                  })
                )}
                className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
              />
            )
          }
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          No property type found
        </p>
      )}
      {errors["ptype"] && <InputErrorMessage msg={errors["ptype"]?.message} />}
    </div>
  );
};

export default PropertyTypeSelector;
