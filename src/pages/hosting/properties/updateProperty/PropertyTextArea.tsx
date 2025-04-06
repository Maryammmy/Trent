import { Control, Controller, FieldErrors } from "react-hook-form";
import { propertyTextAreasData } from "@/data/property/updateProperty";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import TextArea from "@/components/ui/TextArea";
import { PropertyNameInputs } from "@/types";
import { useTranslation } from "react-i18next";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
}
function PropertyTextArea({ control, errors }: IProps) {
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
              <label className="font-medium text-dark">{t(label)}</label>
              <TextArea
                {...field}
                placeholder={t(placeholder)}
                className="w-full border bg-white py-3 px-2 rounded-md outline-none focus:border-2 focus:border-primary"
                maxLength={10000}
                minLength={50}
                rows={5}
              />
              {errors[name] && (
                <InputErrorMessage msg={errors[name]?.message} />
              )}
            </div>
          )}
        />
      ))}
    </>
  );
}

export default PropertyTextArea;
