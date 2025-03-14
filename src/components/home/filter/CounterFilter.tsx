import { floorPlan } from "../../../data/becomeAHost";
import Counter from "../../ui/Counter";
import { useTranslation } from "react-i18next";

interface Props {
  counters: { [key: string]: number };
  updateCounter: (key: string, value: number) => void;
}

function CounterFilter({ counters, updateCounter }: Props) {
  const { t } = useTranslation();

  return (
    <div className="py-4 border-b">
      <h2 className="text-lg font-bold pb-2">
        {t("beds_and_bathrooms_and_guests_limit")}
      </h2>
      {floorPlan.map((item, index) => (
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

export default CounterFilter;
