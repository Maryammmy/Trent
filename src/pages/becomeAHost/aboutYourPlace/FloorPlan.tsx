import { useState } from "react";
import Counter from "../../../components/home/Counter";
import { filterRoomsAndBeds } from "../../../data";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

// Initialize counters outside to avoid reinitialization on re-renders
const initialCounters = Object.fromEntries(
  filterRoomsAndBeds.map((key) => [key, 0])
);

function FloorPlan() {
  const { t } = useTranslation();
  const [counters, setCounters] = useState<{ [key: string]: number }>(
    initialCounters
  );

  const updateCounter = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + value) }));
  };
  const isNextDisabled = Object.values(counters).some((value) => value === 0);

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("floor_plan")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("floor_plan_desc")}
        </p>

        {filterRoomsAndBeds.map((item, index) => (
          <div
            key={index}
            className="flex border-b min-h-28 mb-2 justify-between items-center"
          >
            <span className="font-medium text-lg">{t(item)}</span>
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

      <ProgressBarsWrapper progressBarsData={["80%", "0px", "0px"]} />
      <BackAndNext
        back="/become-a-host/location"
        next="/become-a-host/stand-out"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}

export default FloorPlan;
