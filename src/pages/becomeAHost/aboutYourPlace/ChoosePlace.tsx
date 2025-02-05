import { useState } from "react";
import Button from "../../../components/ui/Button";
import { Propertyhosting } from "../../../data/becomeAHost";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

function ChoosePlace() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-center pb-5 md:pb-10">
          {t("describe_your_place")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Propertyhosting.map((item, index) => {
            const idx = index + 1;
            const { label, icon } = item;
            const translatedLabel = t(label);
            const isSelected = selectedIndex === idx;

            return (
              <Button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`flex flex-col justify-center gap-1 p-4 border rounded-lg min-h-28 bg-white ${
                  isSelected && "bg-zinc-50 border-2 border-black"
                }`}
              >
                <span>{icon}</span>
                <span className="font-medium text-lg text-start">
                  {translatedLabel}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["20%", "0px", "0px"]} />
      <BackAndNext
        back="/become-a-host"
        next="/become-a-host/type-of-place"
        isNextDisabled={!selectedIndex}
      />
    </div>
  );
}

export default ChoosePlace;
