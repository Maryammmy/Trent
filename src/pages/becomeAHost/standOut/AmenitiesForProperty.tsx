import { useState } from "react";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import { amenities } from "../../../data/property/amenities";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

function AmenitiesForProperty() {
  const { t } = useTranslation();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-5 md:pb-10">
          {t("tell_us_about_amenities")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((item, index) => {
            const idx = index + 1;
            const { text, icon } = item;
            const isSelected = selectedIndexes.includes(idx);
            return (
              <Button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`flex flex-col justify-center gap-1 p-4 border rounded-lg min-h-28 bg-white ${
                  isSelected ? "bg-zinc-50 border-2 border-black" : ""
                }`}
              >
                <span>{icon}</span>
                <p className="font-medium text-lg text-start">{text}</p>
              </Button>
            );
          })}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "20%", "0px"]} />
      <BackAndNext
        back="/become-a-host/stand-out"
        next="/become-a-host/photos"
        isNextDisabled={!selectedIndexes.length}
      />
    </div>
  );
}

export default AmenitiesForProperty;
