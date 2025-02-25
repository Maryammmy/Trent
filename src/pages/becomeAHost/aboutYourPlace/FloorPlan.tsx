import { useState } from "react";
import Counter from "../../../components/ui/Counter";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { floorPlan } from "../../../data/becomeAHost";

const initialFloorPlanCounters = Object.fromEntries(
  floorPlan.map((key) => [key, JSON.parse(sessionStorage.getItem(key) || "0")])
);
function FloorPlan() {
  const backButton = "/become-a-host/property-type";
  const { t } = useTranslation();

  const [floorPlanCounters, setFloorPlanCounters] = useState<{
    [key: string]: number;
  }>(initialFloorPlanCounters);
  const updateFloorPlanCounter = (key: string, value: number) => {
    setFloorPlanCounters((prev) => {
      const updatedValue = Math.max(0, prev[key] + value);
      sessionStorage.setItem(key, JSON.stringify(updatedValue));
      return { ...prev, [key]: updatedValue };
    });
  };

  const isNextDisabled = Object.values(floorPlanCounters).some(
    (value) => value === 0
  );
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("floor_plan")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("floor_plan_desc")}
        </p>
        {floorPlan.map((item, index) => (
          <div
            key={index}
            className="flex border-b min-h-28 mb-2 justify-between items-center"
          >
            <span className="font-medium text-lg">{t(item)}</span>
            <Counter
              width="30px"
              height="30px"
              counter={floorPlanCounters[item] ?? 0}
              increaseCounter={() => updateFloorPlanCounter(item, 1)}
              decreaseCounter={() => updateFloorPlanCounter(item, -1)}
            />
          </div>
        ))}
      </div>
      <ProgressBarsWrapper progressBarsData={["80%", "0px", "0px"]} />
      <BackAndNext
        back={backButton}
        next={"/become-a-host/location"}
        isNextDisabled={isNextDisabled}
        allowNext={backButton}
      />
    </div>
  );
}

export default FloorPlan;
