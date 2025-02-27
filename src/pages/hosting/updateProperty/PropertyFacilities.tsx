import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IFacility } from "../../../interfaces";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import Input from "../../../components/ui/Input";
import { PropertyNameInputs } from "../../../types";

interface PropertyFacilitiesProps {
  control: Control<PropertyNameInputs>;
  facilityList?: { data: { facilitylist: IFacility[] } };
}

function PropertyFacilities({
  control,
  facilityList,
}: PropertyFacilitiesProps) {
  const { t } = useTranslation();
  const facilities = facilityList?.data?.facilitylist || [];

  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-white">{t("facilities")}</label>
      {!facilities.length ? (
        <SelectSkeleton />
      ) : (
        <Controller
          name="facility"
          control={control}
          render={({ field }) => (
            <div className="border py-3 px-2 rounded-md bg-white">
              {facilities.map(({ id, title }) => (
                <label
                  key={id}
                  className="flex items-center gap-2 py-1 font-medium"
                >
                  <Input
                    type="checkbox"
                    value={id}
                    checked={field.value?.includes(id)}
                    onChange={(e) => {
                      const selectedValues = new Set(field.value || []);
                      if (e.target.checked) {
                        selectedValues.add(id);
                      } else {
                        selectedValues.delete(id);
                      }
                      field.onChange(Array.from(selectedValues));
                    }}
                    className="accent-dark w-4 h-4"
                  />
                  {title}
                </label>
              ))}
            </div>
          )}
        />
      )}
    </div>
  );
}

export default PropertyFacilities;
