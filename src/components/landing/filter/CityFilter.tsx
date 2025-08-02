import { useTranslation } from "react-i18next";
import Select from "../../ui/Select";
import { ICity } from "@/interfaces/filter";
interface IProps {
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  cities: ICity[] |undefined;
  city: string;
}
function CityFilter({ handleCityChange, cities, city }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 pb-4">
      <label className="text-lg font-bold">{t("city")}</label>
      {!cities ? (
        <p className="border py-3 px-2 rounded-md bg-white">
          {t("choose_government_to_continue")}
        </p>
      ) : cities?.length ? (
        <Select
          value={city}
          onChange={handleCityChange}
          options={cities?.map((city) => ({
            value: city?.name,
            label: city?.name,
          }))}
          className="border py-3 px-2 bg-white rounded-md outline-none focus:border-2 focus:border-primary"
        />
      ) : (
        <p className="border py-3 px-2 rounded-md bg-white">
          {t("no_city_found")}
        </p>
      )}
    </div>
  );
}

export default CityFilter;
