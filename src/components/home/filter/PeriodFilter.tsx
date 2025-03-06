import { useTranslation } from "react-i18next";
import Select from "../../ui/Select";
import SelectSkeleton from "../../skeleton/SelectSkeleton";
import { IPeriod } from "../../../interfaces";
interface IProps {
  handlePeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  periods: IPeriod[];
}

function PeriodFilter({ handlePeriodChange, periods }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 pb-4">
      <label className="text-lg font-bold">{t("period")}</label>
      {!periods ? (
        <SelectSkeleton />
      ) : periods?.length ? (
        <Select
          onChange={handlePeriodChange}
          options={periods?.map((period) => ({
            value: period.id,
            label: period.name,
          }))}
          className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">No period found</p>
      )}
    </div>
  );
}

export default PeriodFilter;
