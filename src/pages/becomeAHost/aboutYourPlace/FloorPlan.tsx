import { useState } from "react";
import Counter from "../../../components/ui/Counter";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import {
  doYouHaveLockForRoom,
  floorPlan,
  floorPlanForRoom,
} from "../../../data/becomeAHost";
import Input from "../../../components/ui/Input";

const storedRoomCounters = sessionStorage.getItem("roomCounters");
const storedFloorPlanCounters = sessionStorage.getItem("floorPlanCounters");
const storedIsHaveALock = sessionStorage.getItem("isHaveALock");

const initialRoomCounters = storedRoomCounters
  ? JSON.parse(storedRoomCounters)
  : Object.fromEntries(floorPlanForRoom.map((key) => [key, 0]));

const initialFloorPlanCounters = storedFloorPlanCounters
  ? JSON.parse(storedFloorPlanCounters)
  : Object.fromEntries(floorPlan.map((key) => [key, 0]));

function FloorPlan() {
  const backButton = "/become-a-host/location";
  const { t } = useTranslation();

  const [roomCounters, setRoomCounters] = useState<{ [key: string]: number }>(
    initialRoomCounters
  );
  const [floorPlanCounters, setFloorPlanCounters] = useState<{
    [key: string]: number;
  }>(initialFloorPlanCounters);
  const [isHaveALock, setIsHaveALock] = useState<string>(
    storedIsHaveALock || ""
  );

  const isRoom = sessionStorage.getItem("selectedTypeOfPlace") === "room";

  const updateRoomCounter = (key: string, value: number) => {
    setRoomCounters((prev) => {
      const updatedCounters = {
        ...prev,
        [key]: Math.max(0, prev[key] + value),
      };
      sessionStorage.setItem("roomCounters", JSON.stringify(updatedCounters));
      return updatedCounters;
    });
  };
  const updateFloorPlanCounter = (key: string, value: number) => {
    setFloorPlanCounters((prev) => {
      const updatedCounters = {
        ...prev,
        [key]: Math.max(0, prev[key] + value),
      };
      sessionStorage.setItem(
        "floorPlanCounters",
        JSON.stringify(updatedCounters)
      );
      return updatedCounters;
    });
  };
  const handleLockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHaveALock(e.target.value);
    sessionStorage.setItem("isHaveALock", e.target.value);
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
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("floor_plan_desc")}
        </p>
        {isRoom
          ? floorPlanForRoom.map((item, index) => (
              <div
                key={index}
                className="flex border-b min-h-28 mb-2 justify-between items-center"
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
            ))
          : floorPlan.map((item, index) => (
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
        {isRoom && (
          <div>
            <h4 className="text-lg md:text-xl font-semibold py-3">
              {t("does_every_bedroom_have_a_lock")}
            </h4>
            {doYouHaveLockForRoom.map((item, index) => (
              <div key={index}>
                <label className="flex gap-4 cursor-pointer items-center p-4">
                  <Input
                    type="radio"
                    name="lock"
                    value={item}
                    onChange={handleLockChange}
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
