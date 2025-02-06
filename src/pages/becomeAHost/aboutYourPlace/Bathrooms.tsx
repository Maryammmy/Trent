import { useState } from "react";
import Counter from "../../../components/home/Counter";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { typesOFBathrooms } from "../../../data/becomeAHost";

const initialBathroomsCounters = Object.fromEntries(
  typesOFBathrooms.map((item) => [item.title, 0]) // Make sure to use `title` as the key
);

function BathRooms() {
  const { t } = useTranslation();
  const [bathroomsCounters, setBathroomsCounters] = useState<{
    [key: string]: number;
  }>(initialBathroomsCounters);

  const updateBathroomsCounter = (key: string, value: number) => {
    setBathroomsCounters((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + value),
    }));
  };
  const isNextDisabled = Object.values(bathroomsCounters).every(
    (value) => value === 0
  );

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("what_kind_of_bathrooms_are_available_to_guests")}
        </h3>
        {typesOFBathrooms.map((item, index) => {
          const { title, desc } = item;
          const lastIndex = index === typesOFBathrooms.length - 1;
          return (
            <div
              key={index}
              className={`flex border-b min-h-28 mb-2 justify-between items-center ${
                lastIndex && "border-b-0"
              }`}
            >
              <div>
                <h5 className="font-medium text-lg pb-2">{t(title)}</h5>
                <p className="text-secondary font-medium text-sm">{t(desc)}</p>
              </div>
              <Counter
                width="30px"
                height="30px"
                counter={bathroomsCounters[title] ?? 0}
                increaseCounter={() => updateBathroomsCounter(title, 1)}
                decreaseCounter={() => updateBathroomsCounter(title, -1)}
              />
            </div>
          );
        })}
      </div>

      <ProgressBarsWrapper progressBarsData={["80%", "0px", "0px"]} />
      <BackAndNext
        back="/become-a-host/floor-plan"
        next="/become-a-host/occupancy"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}

export default BathRooms;
