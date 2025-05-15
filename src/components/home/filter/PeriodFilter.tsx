import { useTranslation } from "react-i18next";
import Select from "../../ui/Select";
import { IPeriod } from "../../../interfaces";
interface IProps {
  handlePeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  periods: IPeriod[];
  period: string;
}

function PeriodFilter({ handlePeriodChange, periods, period }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{t("period")}</label>
      {periods?.length ? (
        <Select
          value={period}
          onChange={handlePeriodChange}
          options={periods?.map((period) => ({
            value: period?.id,
            label: period?.name,
          }))}
          className="border py-3 px-2 disabled:bg-red-500 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">No period found</p>
      )}
    </div>
  );
}

export default PeriodFilter;
