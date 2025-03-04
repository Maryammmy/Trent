import { X } from "lucide-react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Range from "./Range";
import TypeOfPlaceFilter from "./TypeOfPlaceFilter";
import RoomsAndBedsFilter from "./RoomsAndBedsFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import FilterActions from "./FilterActions";
import FacilitiesFilter from "./FacilitiesFilter";
import { filterRoomsAndBeds } from "../../../data/landingData";
import { useFiltersAPI } from "../../../services/filtersService";
import PeriodFilter from "./PeriodFilter";
import CompoundFilter from "./CompoundFilter";

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
  const [period, setPeriod] = useState<string>("");
  const [compound, setCompound] = useState<string>("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const { data } = useFiltersAPI();
  const [values, setValues] = useState<number[]>([]);
  useEffect(() => {
    if (data?.data?.period?.length) {
      setPeriod(data.data.period?.[0]?.id);
    }
    if (data?.data?.compound_names?.length) {
      setCompound(data?.data?.compound_names?.[0]?.id);
    }
    if (
      data?.data?.price_range?.min_price &&
      data?.data?.price_range?.max_price
    ) {
      setValues([
        data?.data?.price_range?.min_price,
        data?.data?.price_range?.max_price,
      ]);
    }
  }, [data]);
  const handleSelectedFacilities = (id: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = event.target.value;
    setPeriod(newPeriod);
  };
  const handleCompoundChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newcompound = event.target.value;
    setCompound(newcompound);
  };
  const updateCounter = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + value) }));
  };
  const handleClear = () => {
    setSelectedPlace("");
    setValues([
      data?.data?.price_range?.min_price,
      data?.data?.price_range?.max_price,
    ]);
    setCounters(initialCounters);
    setSelectedFacilities([]);
    setSelectedPropertyType("");
    setPeriod("");
    setCompound("");
  };
  console.log(values);
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
        <PeriodFilter
          handlePeriodChange={handlePeriodChange}
          periods={data?.data?.period}
        />
        <CompoundFilter
          handleCompoundChange={handleCompoundChange}
          compounds={data?.data?.compound_names}
        />
        <div className="border-b py-4">
          <h2 className="text-lg font-bold pb-4">{t("price_range")}</h2>
          <Range
            values={values}
            handleRangeChange={(newValues: number[]) => setValues(newValues)}
          />
        </div>
        <RoomsAndBedsFilter counters={counters} updateCounter={updateCounter} />
        <FacilitiesFilter
          selectedFacilities={selectedFacilities}
          handleSelectedFacilities={handleSelectedFacilities}
        />
        <PropertyTypeFilter
          selectedProperty={selectedPropertyType}
          handleSelectedProperty={(id: string) => setSelectedPropertyType(id)}
        />
        <FilterActions
          close={close}
          handleClear={handleClear}
          selectedPlace={""}
          selectedFacilities={selectedFacilities}
          selectedPropertyType={selectedPropertyType}
          period={period}
          compound={compound}
          minPrice={values[0]?.toString()}
          maxPrice={values[1]?.toString()}
        />
      </div>
    </Modal>
  );
}

export default FilterModal;
