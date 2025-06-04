import { useContext } from "react";
import { filterButtons } from "../../../data/landing";
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
  city: string;
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
  city,
}: IProps) {
  const { t } = useTranslation();
  // const [enabled, setEnabled] = useState(false);
  const { setFilterData, setCategory, setFilters, setFilterSlider } =
    useContext(FilterDataContext);
  const filterData = {
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
    city_name: city,
  };
  const handleClearFilters = () => {
    setCategory("");
    setFilterData(null);
    setFilterSlider(null);
    setFilters(null);
    // setEnabled(false);
    handleClear();
    close();
  };
  const handleApply = () => {
    setCategory("");
    setFilterData(null);
    setFilterSlider(null);
    setFilters(filterData);
    close();
  };
  return (
    <div className="flex justify-between pt-4">
      {filterButtons.map((button, index) => (
        <Button
          key={index}
          onClick={button.text === "clear" ? handleClearFilters : handleApply}
          className={`text-lg font-medium py-2 w-24 rounded-md ${button.className}`}
        >
          {t(button.text)}
        </Button>
      ))}
    </div>
  );
}

export default FilterActions;
