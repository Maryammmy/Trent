import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DateValueType } from "react-tailwindcss-datepicker";
import { Button } from "@headlessui/react";
import { homeSearch } from "../../data";
import useClickOutside from "../../hooks/useClickOutside";
import { setIsDestinationOpen } from "../../store/features/homeSearch/homeSearchSlice";
import DestinationCard from "../DestinationCard";
import DatePicker from "../ui/DatePicker";
import Counter from "./Counter";
import {
  validateEndDate,
  validateStartDate,
} from "../../utils/handleChangeDate";

function SearchComponent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDestinationOpen } = useAppSelector((state) => state.homeSearch);
  const [counter, setCounter] = useState(0);
  const [startDateValue, setStartDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDateValue, setEndDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const destinationCardRef = useRef<HTMLDivElement>(null);
  useClickOutside(destinationCardRef, () =>
    dispatch(setIsDestinationOpen(false))
  );
  const handleStartValueChange = (newValue: DateValueType) => {
    const validatedValue = validateStartDate(newValue, endDateValue, t);
    if (validatedValue) setStartDateValue(validatedValue);
  };
  const handleEndValueChange = (newValue: DateValueType) => {
    const validatedValue = validateEndDate(newValue, startDateValue, t);
    if (validatedValue) setEndDateValue(validatedValue);
  };

  return (
    <div className="bg-white rounded-lg lg:w-[1000px] py-6 lg:py-3 px-5 lg:border shadow hover:shadow-lg">
      <div className="grid grid-cols-1 lg:flex gap-4 lg:gap-0 text-sm items-end justify-between">
        {homeSearch.map((item, index) => {
          const title = t(item.title);
          const text = t(item.text);
          const isDestination = title === t("destination");
          return (
            <div
              key={index}
              className={isDestination ? "relative" : ""}
              ref={isDestination ? destinationCardRef : null}
            >
              <div
                onClick={() =>
                  isDestination &&
                  dispatch(setIsDestinationOpen(!isDestinationOpen))
                }
                className="px-2 font-medium w-full flex flex-col"
              >
                <h2 className="pb-2 text-dark">{title}</h2>
                <div className="w-full">
                  {text === t("add_guests") ? (
                    <div className="flex items-center gap-4 text-sm bg-gray-100 px-4 h-10 w-full rounded-md">
                      <p className="text-start w-[90px]">
                        {counter === 0
                          ? t("add_guests")
                          : `${counter} ${
                              counter === 1 ? t("guest") : t("guests")
                            }`}
                      </p>
                      <Counter
                        counter={counter}
                        increaseCounter={() => setCounter(counter + 1)}
                        decreaseCounter={() => setCounter(counter - 1)}
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
                    <div className="bg-gray-100 px-4 h-10 rounded-md flex items-center">
                      {text}
                    </div>
                  )}
                </div>
              </div>
              {isDestination && isDestinationOpen && <DestinationCard />}
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
