import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { propertyInputsData } from "../../../data/property";
import { PropertyNameInputs } from "../../../types";
import Input from "../../../components/ui/Input";

interface IProps {
  control: Control<PropertyNameInputs>;
}

function PropertyInputs({ control }: IProps) {
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
              <label className="font-medium text-white">{t(label)}</label>
              <Input
                {...field}
                type={type}
                placeholder={t(placeholder)}
                className="w-full border bg-white py-3 px-2 rounded-md outline-none focus:border-primary"
              />
            </div>
          )}
        />
      ))}
    </>
  );
}

export default PropertyInputs;
