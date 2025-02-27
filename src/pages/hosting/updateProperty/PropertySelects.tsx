import { useTranslation } from "react-i18next";
import { IGovernement, IPropertyType } from "../../../interfaces";
import { Control, Controller } from "react-hook-form";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import Select from "../../../components/ui/Select";
import { PropertyNameInputs } from "../../../types";

interface IProps {
  control: Control<PropertyNameInputs>;
  propertyType?: { data: { typelist: IPropertyType[] } };
  government?: { data: { governmentlist: IGovernement[] } };
}

function PropertySelects({
  control,
  propertyType,
  government,
}: IProps) {
  const { t } = useTranslation();
  const propertyTypeList = propertyType?.data.typelist || [];
  const governmentList = government?.data?.governmentlist || [];

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-white">{t("property_type")}</label>
        {!propertyTypeList.length ? (
          <SelectSkeleton />
        ) : (
          <Controller
            name="ptype"
            control={control}
            defaultValue={propertyTypeList[0]?.id}
            render={({ field }) => (
              <Select
                {...field}
                options={propertyTypeList.map(({ id, title }) => ({
                  value: id,
                  label: title,
                }))}
              />
            )}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-white">{t("government")}</label>
        {!governmentList.length ? (
          <SelectSkeleton />
        ) : (
          <Controller
            name="government"
            control={control}
            defaultValue={governmentList[0]?.id}
            render={({ field }) => (
              <Select
                {...field}
                options={governmentList.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
              />
            )}
          />
        )}
      </div>
    </>
  );
}

export default PropertySelects;
