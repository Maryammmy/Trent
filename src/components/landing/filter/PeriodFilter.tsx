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
    <div className="flex flex-col gap-2 pb-4">
      <label className="text-lg font-bold">{t("period")}</label>
      {!periods ? (
        <p className="border py-3 px-2 rounded-md bg-white">
          {t("choose_government_to_continue")}
        </p>
      ) : periods?.length ? (
        <Select
          value={period}
          onChange={handlePeriodChange}
          options={periods?.map((period) => ({
            value: period?.id,
            label: period?.name,
          }))}
          className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          {t("no_period_found")}
        </p>
      )}
    </div>
  );
}

export default PeriodFilter;
