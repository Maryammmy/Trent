import { filterTypes } from "../../../data/landingData";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

interface Props {
  selectedPlace: string;
  handleSelectedPlace: (place: string) => void;
}

function TypeOfPlaceFilter({ selectedPlace, handleSelectedPlace }: Props) {
  const { t } = useTranslation();

  return (
    <div className="pb-4">
      <h2 className="text-lg font-bold pb-1">{t("type_of_place_title")}</h2>
      <div className="border rounded-lg grid gird-cols-1 sm:grid-cols-3 overflow-hidden">
        {filterTypes.map((type, index) => {
          const lastIndex =
            index === filterTypes.length - 1
              ? ""
              : "border-b sm:border-r rtl:border-r-0 rtl:border-l";
          return (
            <Button
              key={index}
              onClick={() => handleSelectedPlace(type)}
              className={`py-3 font-medium ${lastIndex} ${
                selectedPlace === type && "bg-zinc-100"
              }`}
            >
              <span>{t(type)}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TypeOfPlaceFilter;
