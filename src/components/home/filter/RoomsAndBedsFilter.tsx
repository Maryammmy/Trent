import Counter from "../Counter";
import { filterRoomsAndBeds } from "../../../data";
import { useTranslation } from "react-i18next";

interface Props {
  counters: { [key: string]: number };
  updateCounter: (key: string, value: number) => void;
}

function RoomsAndBedsFilter({ counters, updateCounter }: Props) {
  const { t } = useTranslation();

  return (
    <div className="py-4 border-b">
      <h2 className="text-lg font-bold pb-4">{t("rooms_and_beds")}</h2>
      {filterRoomsAndBeds.map((item, index) => (
        <div key={index} className="flex mb-2 justify-between items-center">
          <span className="font-medium">{t(item)}</span>
          <Counter
            width="30px"
            height="30px"
            counter={counters[item] ?? 0}
            increaseCounter={() => updateCounter(item, 1)}
            decreaseCounter={() => updateCounter(item, -1)}
          />
        </div>
      ))}
    </div>
  );
}

export default RoomsAndBedsFilter;
