import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import { useGetData } from "../../../hooks/useGetData";
import { IGovernement } from "../../../interfaces";
import { PropertyNameInputs } from "../../../types";
import Select from "../../../components/ui/Select";
import InputErrorMessage from "../../../components/ui/InputErrorMessage";
interface IProps {
  control: Control<PropertyNameInputs>;
  errors: FieldErrors<PropertyNameInputs>;
}
const currentLanguage = localStorage.getItem("i18nextLng");
function GovernmentSelector({ control, errors }: IProps) {
  const { t } = useTranslation();
  const { data: government } = useGetData(
    ["governmentList"],
    `user_api/u_government.php?lang=${currentLanguage}`
  );
  const governmentList: IGovernement[] = government?.data?.governmentlist;
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-white">{t("government")}</label>
      {!governmentList ? (
        <SelectSkeleton />
      ) : governmentList?.length ? (
        <Controller
          name="government"
          control={control}
          defaultValue={governmentList?.[0]?.id}
          render={({ field }) =>
            governmentList?.length === 1 ? (
              <p className="border py-3 px-2 rounded-md bg-white">
                {governmentList?.[0]?.name}
              </p>
            ) : (
              <Select
                {...field}
                options={governmentList?.map((gov: IGovernement) => ({
                  value: gov?.id,
                  label: gov?.name,
                }))}
                className="border py-3 px-2 bg-white rounded-md focus:border-2 focus:border-primary outline-none"
              />
            )
          }
        />
      ) : (
        <p className="border bg-white py-3 px-2 rounded-md">
          No government found
        </p>
      )}
      {errors["government"] && (
        <InputErrorMessage msg={errors["government"]?.message} />
      )}
    </div>
  );
}

export default GovernmentSelector;
