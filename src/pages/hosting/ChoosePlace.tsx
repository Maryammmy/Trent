import { useState } from "react";
import Button from "../../components/ui/Button";
import { PropertyHosting } from "../../data/hosting";
import PrograssBar from "../../components/ui/PrograssBar";
import BackAndNext from "../../components/hosting/BackAndNext";
import { useTranslation } from "react-i18next";

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
          {PropertyHosting.map((item, index) => {
            const { label, icon } = item;
            const translatedLabel = t(label);
            const isSelected = selectedIndex === index;

            return (
              <Button
                key={index}
                onClick={() => handleSelect(index)}
                className={`flex flex-col gap-1 ps-4 border rounded-lg py-5 bg-white ${
                  isSelected && "bg-gray-200 border-2 border-black"
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
      <PrograssBar width="10%" />
      <BackAndNext back="/hosting" next="/hosting/type-of-place" />
    </div>
  );
}

export default ChoosePlace;
