import { X } from "lucide-react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Range from "./Range";
import PropertyTypeFilter from "./PropertyTypeFilter";
import FilterActions from "./FilterActions";
import FacilitiesFilter from "./FacilitiesFilter";
import {
  useFiltersAPI,
  useGovernmentsAPI,
} from "../../../services/filtersService";
import PeriodFilter from "./PeriodFilter";
import CompoundFilter from "./CompoundFilter";
import GovernmentFilter from "./GovernmentFilter";
import CounterFilter from "./CounterFilter";
import { floorPlan } from "../../../data/becomeAHost";

interface IProps {
  isFilterOpen: boolean;
  close: () => void;
}
const initialCounters = Object.fromEntries(floorPlan.map((key) => [key, 0]));
function FilterModal({ isFilterOpen, close }: IProps) {
  const { t } = useTranslation();
  const [counters, setCounters] = useState<{ [key: string]: number }>(
    initialCounters
  );
  const [period, setPeriod] = useState<string>("");
  const [compound, setCompound] = useState<string>("");
  const [government, setGovernment] = useState<string>("");
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [values, setValues] = useState<number[]>([]);
  const { data } = useFiltersAPI();
  const { data: governments } = useGovernmentsAPI();
  const priceRange = data?.data?.price_range;
  const periodList = data?.data?.period_list;
  const compoundList = data?.data?.compound_list;
  const governmentList = governments?.data?.government_list;
  useEffect(() => {
    if (periodList?.length) {
      setPeriod(periodList?.[0]?.id);
    }
    if (compoundList?.length) {
      setCompound(compoundList?.[0]?.id);
    }
    if (governmentList?.length) {
      setGovernment(governmentList?.[0]?.id);
    }
    if (priceRange?.min_price && priceRange?.max_price) {
      setValues([priceRange?.min_price, priceRange?.max_price]);
    }
  }, [compoundList, governmentList, periodList, priceRange]);
  const handleSelectedFacilities = (id: number) => {
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
  const handleGovernmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newGovernement = event.target.value;
    setGovernment(newGovernement);
  };
  const updateCounter = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + value) }));
  };
  const handleClear = () => {
    setValues([
      data?.data?.price_range?.min_price,
      data?.data?.price_range?.max_price,
    ]);
    setCounters(initialCounters);
    setSelectedFacilities([]);
    setSelectedPropertyType("");
    setPeriod(data?.data?.period?.[0]?.id);
    setCompound(data?.data?.compound_names?.[0]?.id);
    setGovernment(governments?.data?.government_list?.[0]?.id);
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
        <PeriodFilter
          handlePeriodChange={handlePeriodChange}
          periods={periodList}
        />
        <CompoundFilter
          handleCompoundChange={handleCompoundChange}
          compounds={compoundList}
        />
        <GovernmentFilter
          handleGovernmentChange={handleGovernmentChange}
          governments={governmentList}
        />
        <div className="border-b py-4">
          <h2 className="text-lg font-bold pb-4">{t("price_range")}</h2>
          <Range
            values={values}
            handleRangeChange={(newValues: number[]) => setValues(newValues)}
          />
        </div>
        <CounterFilter counters={counters} updateCounter={updateCounter} />
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
          selectedFacilities={selectedFacilities}
          selectedPropertyType={selectedPropertyType}
          period={period}
          compound={compound}
          minPrice={values[0]?.toString()}
          maxPrice={values[1]?.toString()}
          government={government}
          bedsCount={counters["beds_count"]}
          bathroomsCount={counters["bathrooms_count"]}
          guestCount={counters["guest_count"]}
        />
      </div>
    </Modal>
  );
}

export default FilterModal;
