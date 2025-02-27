import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { propertyTextAreasData } from "../../../data/property";
import TextArea from "../../../components/ui/TextArea";
import { PropertyNameInputs } from "../../../types";

interface PropertyTextAreasProps {
  control: Control<PropertyNameInputs>;
}

function PropertyTextAreas({ control }: PropertyTextAreasProps) {
  const { t } = useTranslation();

  return (
    <>
      {propertyTextAreasData.map(({ name, label, placeholder }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="font-medium text-white">{t(label)}</label>
              <TextArea
                {...field}
                placeholder={t(placeholder)}
                className="w-full border bg-white py-3 px-2 rounded-md outline-none focus:border-primary"
                rows={5}
                maxLength={10000}
                minLength={50}
              />
            </div>
          )}
        />
      ))}
    </>
  );
}

export default PropertyTextAreas;
