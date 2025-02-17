import { useState } from "react";
import Button from "../../../components/ui/Button";
import { typeOfPlace } from "../../../data/becomeAHost";
import { useTranslation } from "react-i18next";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";

const storedTypeOfPlace = sessionStorage.getItem("selectedTypeOfPlace");
function TypeOfPlace() {
  const { t } = useTranslation();
  const [selectedTypeOfPlace, setSelectedTypeOfPlace] = useState<string>(
    storedTypeOfPlace || ""
  );
  const backButton = "/become-a-host/choose-place";
  const handleSelect = (place: string) => {
    setSelectedTypeOfPlace(place);
    sessionStorage.setItem("selectedTypeOfPlace", place);
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-5 md:pb-10">
          {t("type_of_place")}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {typeOfPlace.map((item, index) => {
            const idx = index + 1;
            const { title, desc, icon } = item;
            const isSelected = selectedTypeOfPlace === title;
            const translatedTitle = t(title);
            const translatedDesc = t(desc);

            return (
              <Button
                key={idx}
                onClick={() => handleSelect(title)}
                className={`flex gap-4 justify-between items-center min-h-28 p-4 border rounded-lg bg-white ${
                  isSelected && "bg-zinc-50 border-2 border-black"
                }`}
              >
                <div className="flex flex-col gap-2 justify-start items-start">
                  <h4 className="font-bold text-lg text-start">
                    {translatedTitle}
                  </h4>
                  <p className="max-w-lg text-start text-dark font-medium">
                    {translatedDesc}
                  </p>
                </div>
                <span>{icon}</span>
              </Button>
            );
          })}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["40%", "0px", "0px"]} />
      <BackAndNext
        back={backButton}
        next="/become-a-host/location"
        isNextDisabled={!selectedTypeOfPlace}
        allowNext={backButton}
      />
    </div>
  );
}

export default TypeOfPlace;
