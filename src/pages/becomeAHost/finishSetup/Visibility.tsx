import { useState } from "react";
import { useTranslation } from "react-i18next";
import { visibility } from "../../../data/becomeAHost";
import Input from "../../../components/ui/Input";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";

function Visibility() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("visibility")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("visibility_desc")}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {visibility.map((item, index) => {
            const idx = index + 1;
            const { title, desc } = item;
            const isSelected = selectedIndex === idx;
            return (
              <div key={idx}>
                <label
                  className={`flex gap-4 cursor-pointer items-center min-h-28 p-4 border rounded-lg bg-white ${
                    isSelected ? "bg-zinc-50 border-2 border-black" : ""
                  }`}
                >
                  <Input
                    type="radio"
                    name="visibility"
                    value={idx}
                    onChange={() => handleSelect(idx)}
                    checked={isSelected}
                    className=" accent-primary w-6 h-6"
                  />
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <h4 className="font-bold text-lg text-start">{t(title)}</h4>
                    <p className="max-w-lg text-start text-secondary font-medium">
                      {t(desc)}
                    </p>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <ProgressBarsWrapper progressBarsData={["100%", "100%", "33.2%"]} />
      <BackAndNext
        back="/become-a-host/instant-book"
        next="/become-a-host/price"
        isNextDisabled={!selectedIndex}
      />
    </div>
  );
}

export default Visibility;
