import { useState } from "react";
import Button from "../../components/ui/Button";
import { typeOfPlace } from "../../data/hosting";
import PrograssBar from "../../components/ui/PrograssBar";
import BackAndNext from "../../components/hosting/BackAndNext";

function TypeOfPlace() {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-center pb-5 md:pb-10">
          What type of place will guests have?
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {typeOfPlace.map((item, index) => {
            const { title, desc, icon } = item;
            const isSelected = selectedIndex === index;

            return (
              <Button
                key={index}
                onClick={() => handleSelect(index)}
                className={`flex gap-4 justify-between items-center p-5 border rounded-lg bg-white ${
                  isSelected && "bg-gray-200 border-2 border-black"
                }`}
              >
                <div className="flex flex-col gap-2 justify-start items-start">
                  <h4 className="font-bold text-lg text-start">{title}</h4>
                  <p className="max-w-lg text-start text-secondary font-medium">
                    {desc}
                  </p>
                </div>
                <span>{icon}</span>
              </Button>
            );
          })}
        </div>
      </div>
      <PrograssBar width="20%" />
      <BackAndNext back="/hosting/choose-place" next="/hosting/location" />
    </div>
  );
}

export default TypeOfPlace;
