import Modal from "../../ui/Modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Range from "./Range";
import PropertyTypeFilter from "./PropertyTypeFilter";
import FilterActions from "./FilterActions";
import FacilitiesFilter from "./FacilitiesFilter";
import {
  useCascadeFiltersAPI,
  useGovernmentsAPI,
} from "../../../services/filtersService";
import PeriodFilter from "./PeriodFilter";
import CompoundFilter from "./CompoundFilter";
import GovernmentFilter from "./GovernmentFilter";
import CounterFilter from "./CounterFilter";
import { floorPlan } from "../../../data/becomeAHost";
import RatingFilter from "./RatingFilter";
import CityFilter from "./CityFilter";
import UpdateSkeleton from "@/components/skeleton/UpdateSkeleton";

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
  const [city, setCity] = useState<string>("");
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [values, setValues] = useState<number[]>([]);
  const [rating, setRating] = useState(0);
  const { data: governments } = useGovernmentsAPI();
  const { data } = useCascadeFiltersAPI(
    government,
    city && city,
    compound && compound
  );
  const governmentList = governments?.data?.data?.government_list;
  const cityList = data?.data?.data?.city_list;
  const compoundList = data?.data?.data?.compound_list;
  const priceRange = data?.data?.data?.price_range;
  const periodList = data?.data?.data?.period_list;
  const propertyTypes = data?.data?.data?.category_list;
  const minPrice =
    priceRange?.min_price !== undefined
      ? Number(priceRange?.min_price)
      : undefined;
  const maxPrice =
    priceRange?.max_price !== undefined
      ? Number(priceRange?.max_price)
      : undefined;
  useEffect(() => {
    if (minPrice && maxPrice) {
      setValues([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);
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
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = event.target.value;
    setCity(newCity);
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const updateCounter = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + value) }));
  };
  const handleClear = () => {
    setValues([priceRange?.min_price, priceRange?.max_price]);
    setCounters(initialCounters);
    setSelectedFacilities([]);
    setSelectedPropertyType("");
    setPeriod("");
    setCompound("");
    setGovernment("");
    setCity("");
    setRating(0);
  };
  return (
    <Modal
      maxWidth="600px"
      className="text-lg text-center p-4 border-b font-semibold"
      title={t("filters")}
      close={close}
      isOpen={isFilterOpen}
    >
      <div className="pb-3">
        <div className="p-5 md:py-8 md:px-10 max-h-[80vh] overflow-y-auto">
          {!governmentList ? (
            <UpdateSkeleton cards={6} />
          ) : (
            <>
              <GovernmentFilter
                government={government}
                handleGovernmentChange={handleGovernmentChange}
                governments={governmentList}
              />
              <CityFilter
                city={city}
                handleCityChange={handleCityChange}
                cities={cityList}
              />
              <CompoundFilter
                compound={compound}
                handleCompoundChange={handleCompoundChange}
                compounds={compoundList}
              />
              <PeriodFilter
                period={period}
                handlePeriodChange={handlePeriodChange}
                periods={periodList}
              />
              <div className="border-b py-4">
                <h2 className="text-lg font-bold pb-2">{t("price_range")}</h2>
                <Range
                  values={values}
                  handleRangeChange={(newValues: number[]) =>
                    setValues(newValues)
                  }
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
              <CounterFilter
                counters={counters}
                updateCounter={updateCounter}
              />
              <FacilitiesFilter
                selectedFacilities={selectedFacilities}
                handleSelectedFacilities={handleSelectedFacilities}
              />
              <PropertyTypeFilter
                propertyTypes={propertyTypes}
                selectedProperty={selectedPropertyType}
                handleSelectedProperty={(id: string) =>
                  setSelectedPropertyType(id)
                }
              />
              <RatingFilter
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
              <FilterActions
                close={close}
                handleClear={handleClear}
                selectedFacilities={selectedFacilities}
                selectedPropertyType={selectedPropertyType}
                rate={rating}
                period={period}
                compound={compound}
                city={city}
                minPrice={values[0]?.toString()}
                maxPrice={values[1]?.toString()}
                government={government}
                bedsCount={counters["beds_count"]}
                bathroomsCount={counters["bathrooms_count"]}
                guestCount={counters["guest_count"]}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
