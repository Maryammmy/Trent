import { Control, Controller, FieldErrors } from "react-hook-form";
import { propertyInputsData } from "@/data/property/updateProperty";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import { PropertyNameInputs } from "@/types";
import { useTranslation } from "react-i18next";
import Input from "@/components/ui/Input";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
}
function PropertyInputs({ control, errors }: IProps) {
  const { t } = useTranslation();
  return (
    <>
      {propertyInputsData.map(({ name, label, type, placeholder }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="font-medium text-dark">{t(label)}</label>
              <Input
                {...field}
                type={type}
                placeholder={t(placeholder)}
                className="w-full border bg-white py-3 px-2 rounded-md outline-none focus:border-2 focus:border-primary"
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

export default PropertyInputs;
