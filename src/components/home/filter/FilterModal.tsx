import { X } from "lucide-react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { filterRoomsAndBeds } from "../../../data";
import Range from "./Range";
import TypeOfPlaceFilter from "./TypeOfPlaceFilter";
import RoomsAndBedsFilter from "./RoomsAndBedsFilter";
import AmenitiesFilter from "./AmenitiesFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import FilterActions from "./FilterActions";

interface IProps {
  isFilterOpen: boolean;
  close: () => void;
}

const initialCounters = Object.fromEntries(
  filterRoomsAndBeds.map((key) => [key, 0])
);

function FilterModal({ isFilterOpen, close }: IProps) {
  const { t } = useTranslation();
  const [counters, setCounters] = useState<{ [key: string]: number }>(
    initialCounters
  );
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [values, setValues] = useState([500, 50000]);
  const handleSelectedAmenities = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };
  const updateCounter = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + value) }));
  };
  const handleClear = () => {
    setSelectedPlace("");
    setValues([500, 50000]);
    setCounters(initialCounters);
    setSelectedAmenities([]);
    setSelectedProperty("");
  };

  return (
    <Modal
      maxWidth="600px"
      className="text-lg text-center p-4 border-b font-semibold"
      title={t("filters")}
      close={close}
      isOpen={isFilterOpen}
    >
      <Button
        onClick={close}
        className="absolute top-5 right-4 text-gray-500 hover:text-black"
      >
        <X className="text-black" size={20} />
      </Button>
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <TypeOfPlaceFilter
          selectedPlace={selectedPlace}
          handleSelectedPlace={(place: string) => setSelectedPlace(place)}
        />
        <div className="border-b py-4">
          <h2 className="text-lg font-bold pb-4">{t("price_range")}</h2>
          <Range
            values={values}
            handleRangeChange={(newValues: number[]) => setValues(newValues)}
          />
        </div>
        <RoomsAndBedsFilter counters={counters} updateCounter={updateCounter} />
        <AmenitiesFilter
          selectedAmenities={selectedAmenities}
          handleSelectedAmenities={handleSelectedAmenities}
        />
        <PropertyTypeFilter
          selectedProperty={selectedProperty}
          handleSelectedProperty={(property: string) =>
            setSelectedProperty(property)
          }
        />
        <FilterActions handleClear={handleClear} />
      </div>
    </Modal>
  );
}

export default FilterModal;
