import { useContext, useEffect, useState } from "react";
import { filterButtons } from "../../../data/landing";
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
  compound,
  close,
}: IProps) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  const { setFilterData, setCategory } = useContext(FilterDataContext);
  const filters = {
    period: period,
    facilities: selectedFacilities.length ? selectedFacilities : undefined,
    category_id: selectedPropertyType,
    min_price: minPrice,
    max_price: maxPrice,
    government_id: government,
    beds_count: bedsCount,
    bathrooms_count: bathroomsCount,
    guest_count: guestCount,
    rate: rate,
    compound_name: compound,
  };
  const { data } = useHomeDataAPI(filters, enabled);
  const filteredProperties = data?.data?.data?.property_list;
  const handleClearFilters = () => {
    setCategory("");
    setEnabled(false);
    setFilterData(null);
    handleClear();
    close();
  };
  const handleApply = () => {
    setCategory("");
    setEnabled(true);
  };
  useEffect(() => {
    if (filteredProperties && enabled) {
      setFilterData(filteredProperties);
      close();
    }
  }, [filteredProperties, setFilterData, close, enabled]);
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
