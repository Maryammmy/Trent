import { useState } from "react";
import Counter from "../../components/home/Counter";
import { filterRoomsAndBeds } from "../../data";
import PrograssBar from "../../components/ui/PrograssBar";
import BackAndNext from "../../components/hosting/BackAndNext";
import { useTranslation } from "react-i18next";

function FloorPlan() {
  const { t } = useTranslation();
  const [counters, setCounters] = useState<{ [key: string]: number }>({
    Bedrooms: 0,
    Beds: 0,
    Bathrooms: 0,
  });
  const increaseCounter = (key: string) => {
    setCounters((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decreaseCounter = (key: string) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-2">
          {t("floor_plan")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("floor_plan_desc")}
        </p>
        {filterRoomsAndBeds.map((item, index) => {
          const translatedItem = t(item);
          const lastIndex = index === filterRoomsAndBeds.length - 1;
          return (
            <div
              key={index}
              className={`flex border-b py-5 mb-2 justify-between items-center ${
                lastIndex && "border-none"
              }`}
            >
              <span className="font-medium">{translatedItem}</span>
              <Counter
                width="30px"
                height="30px"
                counter={counters[item]}
                increaseCounter={() => increaseCounter(item)}
                decreaseCounter={() => decreaseCounter(item)}
              />
            </div>
          );
        })}
      </div>
      <PrograssBar width="40%" />
      <BackAndNext back="/hosting/location" next="/hosting/floor-plan" />
    </div>
  );
}

export default FloorPlan;
