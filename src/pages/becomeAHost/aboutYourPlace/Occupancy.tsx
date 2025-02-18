import { useState } from "react";
import Button from "../../../components/ui/Button";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import { occupancy } from "../../../data/becomeAHost";

const storedOccupancy = sessionStorage.getItem("selectedOccupancy");
function Occupancy() {
  const { t } = useTranslation();
  const [selectedOccupancy, setSelectedOccupancy] = useState<string[]>(
    storedOccupancy ? JSON.parse(storedOccupancy) : []
  );

  const handleSelect = (label: string) => {
    setSelectedOccupancy((prev) => {
      const updatedIndexes = prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label];

      sessionStorage.setItem(
        "selectedOccupancy",
        JSON.stringify(updatedIndexes)
      );
      return updatedIndexes;
    });
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-5 md:pb-5">
          {t("occupancy_title")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("occupancy_desc")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {occupancy.map((item, index) => {
            const idx = index + 1;
            const { label, icon } = item;
            const isSelected = selectedOccupancy.includes(label);
            return (
              <Button
                key={idx}
                onClick={() => handleSelect(label)}
                className={`flex flex-col justify-center gap-1 p-4 border rounded-lg min-h-28 bg-white ${
                  isSelected ? "bg-zinc-50 border-2 border-black" : ""
                }`}
              >
                <span>{icon}</span>
                <p className="font-medium text-lg text-start">{t(label)}</p>
              </Button>
            );
          })}
        </div>
        <p className="max-w-2xl text-dark font-medium pt-5">
          {t("occupancy_result")}
        </p>
      </div>
      <ProgressBarsWrapper progressBarsData={["90%", "0px", "0px"]} />
      <BackAndNext
        back="/become-a-host/bathrooms"
        next="/become-a-host/stand-out"
        isNextDisabled={!selectedOccupancy.length}
      />
    </div>
  );
}

export default Occupancy;
