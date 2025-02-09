import { useState } from "react";
import Counter from "../../../components/home/Counter";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import {
  doYouHaveLockForRoom,
  floorPlan,
  floorPlanForRoom,
} from "../../../data/becomeAHost";
import Input from "../../../components/ui/Input";

const initialRoomCounters = Object.fromEntries(
  floorPlanForRoom.map((key) => [key, 0])
);
const initialFloorPlanCounters = Object.fromEntries(
  floorPlan.map((key) => [key, 0])
);

function FloorPlan() {
  const backButton = "/become-a-host/location";
  const { t } = useTranslation();
  const [roomCounters, setRoomCounters] = useState<{ [key: string]: number }>(
    initialRoomCounters
  );
  const [floorPlanCounters, setFloorPlanCounters] = useState<{
    [key: string]: number;
  }>(initialFloorPlanCounters);
  const [isHaveALock, setIsHaveALock] = useState("");
  const isRoom = localStorage.getItem("selectedPlace") === "room";
  const updateRoomCounter = (key: string, value: number) => {
    setRoomCounters((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + value),
    }));
  };
  const updateFloorPlanCounter = (key: string, value: number) => {
    setFloorPlanCounters((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + value),
    }));
  };

  const isNextDisabled = isRoom
    ? Object.values(roomCounters).some((value) => value === 0) || !isHaveALock
    : Object.values(floorPlanCounters).some((value) => value === 0);

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("floor_plan")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("floor_plan_desc")}
        </p>
        {isRoom
          ? floorPlanForRoom.map((item, index) => {
              const lastIndex = index === floorPlanForRoom.length - 1;
              return (
                <div
                  key={index}
                  className={`flex border-b min-h-28 mb-2 justify-between items-center ${
                    lastIndex && "border-b-0"
                  }`}
                >
                  <span className="font-medium text-lg">{t(item)}</span>
                  <Counter
                    width="30px"
                    height="30px"
                    counter={roomCounters[item] ?? 0}
                    increaseCounter={() => updateRoomCounter(item, 1)}
                    decreaseCounter={() => updateRoomCounter(item, -1)}
                  />
                </div>
              );
            })
          : floorPlan.map((item, index) => {
              const lastIndex = index === floorPlan.length - 1;
              return (
                <div
                  key={index}
                  className={`flex border-b min-h-28 mb-2 justify-between items-center ${
                    lastIndex && "border-b-0"
                  }`}
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
              );
            })}
        {isRoom && (
          <div>
            <h4 className="text-lg md:text-xl font-semibold py-3">
              {t("does_every_bedroom_have_a_lock")}
            </h4>
            {doYouHaveLockForRoom.map((item, index) => (
              <div key={index}>
                <label className={`flex gap-4 cursor-pointer items-center p-4`}>
                  <Input
                    type="radio"
                    name="lock"
                    value={item}
                    onChange={(e) => setIsHaveALock(e.target.value)}
                    checked={isHaveALock === item}
                    className=" accent-primary w-4 h-4"
                  />
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <h4 className="font-bold text-start">{t(item)}</h4>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      <ProgressBarsWrapper
        progressBarsData={[isRoom ? "70%" : "80%", "0px", "0px"]}
      />
      <BackAndNext
        back={backButton}
        next={isRoom ? "/become-a-host/bathrooms" : "/become-a-host/stand-out"}
        isNextDisabled={isNextDisabled}
        allowNext={backButton}
      />
    </div>
  );
}

export default FloorPlan;
