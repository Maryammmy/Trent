import { useTranslation } from "react-i18next";
import { instantBook } from "../../../data/becomeAHost";
import Button from "../../../components/ui/Button";
import { useState } from "react";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

function InstantBook() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("instant_book")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("instant_book_desc")}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {instantBook.map((item, index) => {
            const idx = index + 1;
            const { title, desc, icon, text } = item;
            const isSelected = selectedIndex === idx;

            return (
              <Button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`flex gap-4 justify-between items-center min-h-28 p-4 border rounded-lg bg-white ${
                  isSelected && "bg-zinc-50 border-2 border-black"
                }`}
              >
                <div className="flex flex-col gap-1 justify-start items-start">
                  <h4 className="font-bold text-lg text-start">{t(title)}</h4>
                  {text && (
                    <span className="font-medium text-[#008A05]">
                      {t(text)}
                    </span>
                  )}
                  <p className="max-w-lg text-start text-secondary font-medium">
                    {t(desc)}
                  </p>
                </div>
                <span>{icon}</span>
              </Button>
            );
          })}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "16.6%"]} />
      <BackAndNext
        back="/become-a-host/finish-setup"
        next="/become-a-host/visibility"
        isNextDisabled={!selectedIndex}
      />
    </div>
  );
}

export default InstantBook;
