import { useTranslation } from "react-i18next";
import { IGovernement } from "../../../interfaces";
import SelectSkeleton from "../../skeleton/SelectSkeleton";
import Select from "../../ui/Select";
interface IProps {
  handleGovernmentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  governments: IGovernement[];
  government: string;
}
function GovernmentFilter({
  handleGovernmentChange,
  governments,
  government,
}: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 pb-4">
      <label className="text-lg font-bold">{t("government")}</label>
      {!governments ? (
        <SelectSkeleton />
      ) : governments?.length ? (
        <Select
          value={government}
          onChange={handleGovernmentChange}
          options={governments?.map((government) => ({
            value: government?.id,
            label: government?.name,
          }))}
          className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          t("no_government_found")
        </p>
      )}
    </div>
  );
}

export default GovernmentFilter;
