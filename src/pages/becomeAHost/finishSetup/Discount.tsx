import { useTranslation } from "react-i18next";
import { useState } from "react";
import { discount } from "../../../data/becomeAHost";
import Input from "../../../components/ui/Input";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

function Discount() {
  const { t } = useTranslation();
  const initialSelectedIndices = discount.map((_, index) => index + 1);
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    initialSelectedIndices
  );
  const handleSelect = (index: number) => {
    if (selectedIndices.includes(index)) {
      if (selectedIndices.length > 1) {
        setSelectedIndices(selectedIndices.filter((idx) => idx !== index));
      }
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("add_discounts")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("add_discounts_desc")}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {discount.map((item, index) => {
            const idx = index + 1;
            const { title, desc } = item;
            const isSelected = selectedIndices.includes(idx);

            return (
              <div key={idx}>
                <label
                  className={`flex gap-4 cursor-pointer items-center min-h-28 p-4 border rounded-lg bg-white ${
                    isSelected ? "bg-zinc-50 border-2 border-black" : ""
                  }`}
                >
                  <Input
                    type="checkbox"
                    name="visibility"
                    value={idx}
                    onChange={() => handleSelect(idx)}
                    checked={isSelected}
                    className="accent-primary w-6 h-6"
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
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "65.4%"]} />
      <BackAndNext
        back="/become-a-host/price"
        next="/become-a-host/legal-and-create"
        isNextDisabled={!selectedIndices.length}
      />
    </div>
  );
}

export default Discount;
