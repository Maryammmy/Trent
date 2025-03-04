import { useState } from "react";
import { filterButtons } from "../../../data/landingData";
import { useHomeDataAPI } from "../../../services/homeService";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

interface IProps {
  handleClear: () => void;
  close: () => void;
  selectedPlace: string;
  selectedFacilities: string[];
  selectedPropertyType: string;
  period: string;
  compound: string;
  minPrice: string;
  maxPrice: string;
}
function FilterActions({
  handleClear,
  selectedFacilities,
  period,
  minPrice,
  maxPrice,
}: IProps) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  const { data } = useHomeDataAPI(
    {
      period: period,
      facilities: selectedFacilities,
      min_price: minPrice,
      max_price: maxPrice,
    },
    enabled
  );
  console.log(selectedFacilities);
  const handleApply = () => {
    setEnabled(true);
    console.log(data);
  };

  return (
    <div className="flex justify-between py-2">
      {filterButtons.map((button, index) => (
        <Button
          key={index}
          onClick={button.text === "clear" ? handleClear : handleApply}
          className={`text-lg font-medium py-2 px-6 rounded-md ${button.className}`}
        >
          {t(button.text)}
        </Button>
      ))}
    </div>
  );
}

export default FilterActions;
