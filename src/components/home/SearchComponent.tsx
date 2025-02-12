import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DateValueType } from "react-tailwindcss-datepicker";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import { homeSearch } from "../../data";
import useClickOutside from "../../hooks/useClickOutside";
import {
  setIsDestinationOpen,
  setIsDropdownOpen,
  setIsLangSwitcherOpen,
} from "../../store/features/homeSearch/homeSearchSlice";
import DestinationCard from "../DestinationCard";
import DatePicker from "../ui/DatePicker";
import Counter from "./Counter";

function SearchComponent() {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);
  const { isDestinationOpen } = useAppSelector((state) => state.homeSearch);
  const [startDateValue, setStartDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDateValue, setEndDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const handleStartValueChange = (newValue: DateValueType) => {
    const { startDate } = newValue || {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate && new Date(startDate) < today) {
      toast.error(t("error_Check_in_after_today"));
      return;
    }
    if (
      startDate &&
      endDateValue?.startDate &&
      new Date(startDate) > new Date(endDateValue.startDate)
    ) {
      toast.error(t("error_check_in"));
      return;
    }
    setStartDateValue(newValue);
  };
  const handleEndValueChange = (newValue: DateValueType) => {
    const { startDate } = newValue || {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate && new Date(startDate) < today) {
      toast.error(t("error_Check_out_after_today"));
      return;
    }
    if (
      startDate &&
      startDateValue?.startDate &&
      new Date(startDate) < new Date(startDateValue.startDate)
    ) {
      toast.error(t("error_check_out"));
      setEndDateValue({ startDate: null, endDate: null });
      return;
    }

    setEndDateValue(newValue);
  };
  const dispatch = useAppDispatch();
  const destinationCardRef = useRef<HTMLDivElement>(null);
  const handleDestinationToggle = () => {
    dispatch(setIsDestinationOpen(!isDestinationOpen));
    dispatch(setIsDropdownOpen(false));
    dispatch(setIsLangSwitcherOpen(false));
  };
  useClickOutside(destinationCardRef, () =>
    dispatch(setIsDestinationOpen(false))
  );
  const updateCounter = (value: number) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:flex lg:flex-wrap gap-4 lg:gap-0 text-sm items-end justify-between bg-white rounded-lg lg:w-[1000px] py-6 lg:py-3 px-5 lg:border shadow hover:shadow-lg">
        {homeSearch.map((item, index) => {
          const title = t(item.title);
          const text = t(item.text);
          const destination = title === t("destination");

          return (
            <div
              key={index}
              className={` ${destination && "relative"}`}
              ref={destination ? destinationCardRef : null}
            >
              <Button
                onClick={() =>
                  title === t("destination") && handleDestinationToggle()
                }
                className={`px-2 font-medium w-full flex flex-col`}
              >
                <h2 className="pb-2 text-dark">{title}</h2>
                <div className="w-full">
                  {text === t("add_guests") ? (
                    <div className="flex items-center gap-4 text-sm bg-gray-100 px-4 h-10 rounded-md">
                      <p className="text-start">
                        {counter === 0
                          ? t("add_guests")
                          : counter === 1
                          ? `${counter} ${t("guest")}`
                          : `${counter} ${t("guests")}`}
                      </p>
                      <Counter
                        counter={counter}
                        increaseCounter={() => updateCounter(1)}
                        decreaseCounter={() => updateCounter(-1)}
                      />
                    </div>
                  ) : title === t("check_in") ? (
                    <DatePicker
                      dateValue={startDateValue}
                      handleValueChange={handleStartValueChange}
                      className="h-10 bg-gray-100 w-full"
                    />
                  ) : title === t("check_out") ? (
                    <DatePicker
                      dateValue={endDateValue}
                      handleValueChange={handleEndValueChange}
                      className="h-10 bg-gray-100 w-full"
                    />
                  ) : (
                    <div>
                      <p className=" bg-gray-100 px-4 h-10 rounded-md flex items-center">
                        {text}
                      </p>
                    </div>
                  )}
                </div>
              </Button>
              {destination && isDestinationOpen && <DestinationCard />}
            </div>
          );
        })}
        <Button className="text-white font-medium bg-primary px-4 h-10 rounded-md">
          <span>{t("search")}</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchComponent;
