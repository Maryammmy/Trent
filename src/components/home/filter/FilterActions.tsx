import { useContext, useEffect, useState } from "react";
import { filterButtons } from "../../../data/landingData";
import { useHomeDataAPI } from "../../../services/homeService";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import { FilterDataContext } from "../../../context/FilterDataContext";

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
  rate: number;
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
  rate,
  close,
}: IProps) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  const { setFilterData } = useContext(FilterDataContext);
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
      rate: rate || undefined,
    }).filter(([, value]) => value !== undefined && value !== null)
  );
  console.log(rate);
  const { data } = useHomeDataAPI(filters, enabled);
  const filteredProperties = data?.data?.data?.property_list;
  const handleClearFilters = () => {
    setEnabled(false);
    setFilterData(null);
    handleClear();
    close();
  };
  const handleApply = () => {
    setEnabled(true);
  };
  useEffect(() => {
    if (filteredProperties) {
      setFilterData(filteredProperties);
    }
  }, [filteredProperties, setFilterData]);

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
