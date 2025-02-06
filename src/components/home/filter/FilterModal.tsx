import { ChevronDown, ChevronUp, X } from "lucide-react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useState } from "react";
import Range from "./Range";
import Counter from "../Counter";
import { amenities } from "../../../data/property/amenities";
import {
  filterPropertyType,
  filterRoomsAndBeds,
  filterTypes,
} from "../../../data";
import { useTranslation } from "react-i18next";

interface IProps {
  isFilterOpen: boolean;
  close: () => void;
}
// Initialize counters outside to avoid reinitialization on re-renders
const initialCounters = Object.fromEntries(
  filterRoomsAndBeds.map((key) => [key, 0])
);
function FilterModal({ isFilterOpen, close }: IProps) {
  const { t } = useTranslation();
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [counters, setCounters] = useState<{ [key: string]: number }>(
    initialCounters
  );
  const [values, setValues] = useState([500, 50000]);
  const handleRangeChange = (newValues: number[]) => {
    setValues(newValues);
  };
  const updateCounter = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + value) }));
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
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>

      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="border-b pb-4">
          <h2 className="text-lg font-bold pb-4">{t("type_of_place_title")}</h2>
          <div className="border rounded-lg py-2 grid grid-cols-3">
            {filterTypes.map((type, index) => {
              const lastIndex =
                index === filterTypes.length - 1
                  ? ""
                  : " border-r rtl:border-r-0 rtl:border-l";
              return (
                <Button
                  key={index}
                  className={`py-1 font-medium ${lastIndex} `}
                >
                  <span>{t(type)}</span>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="border-b py-4">
          <h2 className="text-lg font-bold pb-4">{t("price_range")}</h2>
          <Range values={values} handleRangeChange={handleRangeChange} />
        </div>
        <div className="py-4 border-b">
          <h2 className="text-lg font-bold pb-4">{t("rooms_and_beds")}</h2>
          {filterRoomsAndBeds.map((item, index) => (
            <div key={index} className="flex mb-2 justify-between items-center">
              <span className="font-medium">{t(item)}</span>
              <Counter
                width="30px"
                height="30px"
                counter={counters[item] ?? 0}
                increaseCounter={() => updateCounter(item, 1)}
                decreaseCounter={() => updateCounter(item, -1)}
              />
            </div>
          ))}
        </div>
        <div className="py-4 border-b">
          <h2 className="text-lg font-bold pb-4">{t("amenities")}</h2>
          <div className="flex flex-wrap gap-2  ">
            {amenities.slice(0, 4).map((item, index) => {
              const { text, icon } = item;
              return (
                <div
                  key={index}
                  className="flex gap-2 flex-wrap border rounded-full  py-2 px-3"
                >
                  <span className="font-medium">{text}</span>
                  <span>{icon}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-4">
          <Button
            onClick={() => setIsPropertyTypeOpen(!isPropertyTypeOpen)}
            className="flex w-full justify-between items-center pb-4"
          >
            <h2 className="text-lg font-bold">{t("property_type")}</h2>
            <span>{isPropertyTypeOpen ? <ChevronUp /> : <ChevronDown />}</span>
          </Button>
          {isPropertyTypeOpen && (
            <div className="flex flex-wrap gap-2">
              {filterPropertyType.map((item, index) => {
                const { name, icon } = item;
                return (
                  <div
                    key={index}
                    className="flex gap-2 flex-wrap border rounded-full py-2 px-4"
                  >
                    <span className="font-medium">{name}</span>
                    <span>{icon}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
