import { useTranslation } from "react-i18next";
import { useState } from "react";
import { discount } from "../../../data/becomeAHost";
import Input from "../../../components/ui/Input";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

const storedDiscounts = sessionStorage.getItem("selectedDiscounts");

function Discount() {
  const { t } = useTranslation();
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>(
    storedDiscounts ? JSON.parse(storedDiscounts) : []
  );

  const handleSelect = (title: string) => {
    const updatedDiscounts = selectedDiscount.includes(title)
      ? selectedDiscount.filter((item) => item !== title)
      : [...selectedDiscount, title];

    setSelectedDiscount(updatedDiscounts);
    sessionStorage.setItem(
      "selectedDiscounts",
      JSON.stringify(updatedDiscounts)
    ); // ✅ تحديث التخزين هنا
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("add_discounts")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("add_discounts_desc")}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {discount.map((item, index) => {
            const { title, desc } = item;
            const isSelected = selectedDiscount.includes(title);

            return (
              <div key={index}>
                <label
                  className={`flex gap-4 cursor-pointer items-center min-h-28 p-4 border rounded-lg bg-white ${
                    isSelected ? "bg-zinc-50 border-2 border-black" : ""
                  }`}
                >
                  <Input
                    type="checkbox"
                    name="discount"
                    value={title}
                    onChange={() => handleSelect(title)}
                    checked={isSelected}
                    className="accent-primary w-6 h-6"
                  />
                  <div className="flex flex-col gap-1 justify-start items-start">
                    <h4 className="font-bold text-lg text-start">{t(title)}</h4>
                    <p className="max-w-lg text-start text-dark font-medium">
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
        isNextDisabled={!selectedDiscount.length}
      />
    </div>
  );
}

export default Discount;
