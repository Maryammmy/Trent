import Button from "../../ui/Button";
import { filterTypes } from "../../../data";
import { useTranslation } from "react-i18next";

interface Props {
  selectedPlace: string;
  handleSelectedPlace: (place: string) => void;
}

function TypeOfPlaceFilter({ selectedPlace, handleSelectedPlace }: Props) {
  const { t } = useTranslation();

  return (
    <div className="border-b pb-4">
      <h2 className="text-lg font-bold pb-4">{t("type_of_place_title")}</h2>
      <div className="border rounded-lg grid grid-cols-3 overflow-hidden">
        {filterTypes.map((type, index) => {
          const lastIndex =
            index === filterTypes.length - 1
              ? ""
              : " border-r rtl:border-r-0 rtl:border-l";
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
