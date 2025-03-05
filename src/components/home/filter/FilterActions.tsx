import { useState } from "react";
import { filterButtons } from "../../../data/landingData";
import { useHomeDataAPI } from "../../../services/homeService";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

interface IProps {
  handleClear: () => void;
  close: () => void;
  selectedFacilities: number[];
  selectedPropertyType: string;
  period: string;
  compound: string;
  minPrice: string;
  maxPrice: string;
  government: string;
  bedsCount: number;
  bathroomsCount: number;
  guestCount: number;
}
function FilterActions({
  handleClear,
  selectedFacilities,
  selectedPropertyType,
  period,
  minPrice,
  maxPrice,
  government,
  bedsCount,
  bathroomsCount,
  guestCount,
}: IProps) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  const filters = Object.fromEntries(
    Object.entries({
      period: period || undefined,
      facilities:
        selectedFacilities.length > 0 ? selectedFacilities : undefined,
      category_id: selectedPropertyType || undefined,
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
      government: government || undefined,
      beds_count: bedsCount || undefined,
      bathrooms_count: bathroomsCount || undefined,
      guest_count: guestCount || undefined,
    }).filter(([, value]) => value !== undefined && value !== null)
  );
  const { data } = useHomeDataAPI(filters, enabled);
  const handleClearFilters = () => {
    setEnabled(false);
    handleClear();
  };

  const handleApply = () => {
    setEnabled(true);
    console.log(data);
  };

  return (
    <div className="flex justify-between py-2">
      {filterButtons.map((button, index) => (
        <Button
          key={index}
          onClick={button.text === "clear" ? handleClearFilters : handleApply}
          className={`text-lg font-medium py-2 px-6 rounded-md ${button.className}`}
        >
          {t(button.text)}
        </Button>
      ))}
    </div>
  );
}

export default FilterActions;
