import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { homeSearch } from "../../data";
import Counter from "./Counter";
import Input from "../ui/Input";
import Button from "../ui/Button";
import DatePicker from "../ui/DatePicker";
import DestinationCard from "../DestinationCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsDestinationOpen,
  setIsDropdownOpen,
  setIsLangSwitcherOpen,
} from "../../store/features/homeSearch/homeSearchSlice";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function HomeSearch() {
  const { pathname } = useLocation();
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
  const destinationButtonRef = useRef<HTMLButtonElement>(null);
  const destinationCardRef = useRef<HTMLDivElement>(null);
  const handleDestinationToggle = () => {
    dispatch(setIsDestinationOpen(!isDestinationOpen));
    dispatch(setIsDropdownOpen(false));
    dispatch(setIsLangSwitcherOpen(false));
  };
  useClickOutside(
    destinationCardRef,
    () => dispatch(setIsDestinationOpen(false)),
    destinationButtonRef
  );
  const updateCounter = (value: number) => {
    setCounter((prevCounter) => prevCounter + value);
  };

  return (
    <>
      {(pathname === "/" || pathname === "/property/1") && (
        <>
          <div className="flex lg:hidden items-center justify-center gap-2 w-full md:w-[500px] rounded-full py-2 px-5 border shadow hover:shadow-lg">
            <Search className="text-primary" strokeWidth={2.7} />
            <Input
              type="search"
              className="w-full outline-none bg-transparent placeholder:text-primary placeholder:font-medium"
              placeholder={t("placeholder_search")}
            />
          </div>
          <div className="hidden lg:block">
            <div className="flex text-sm items-end  justify-between bg-white rounded-lg w-[1000px] py-3 px-5 border shadow hover:shadow-lg">
              {homeSearch.map((item, index) => {
                const title = t(item.title);
                const text = t(item.text);

                return (
                  <Button
                    ref={title === t("where") ? destinationButtonRef : null}
                    onClick={() =>
                      title === t("where") && handleDestinationToggle()
                    }
                    key={index}
                    className={`px-2 font-medium  flex flex-col`}
                  >
                    <h2 className="pb-2 text-dark">{title}</h2>
                    <div>
                      {text === t("add_guests") ? (
                        <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 h-10 rounded-md">
                          <p className=" w-[90px] text-start">
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
                          showShortcuts={true}
                          useRange={true}
                          dateValue={startDateValue}
                          handleValueChange={handleStartValueChange}
                          className="h-10 bg-gray-100"
                        />
                      ) : title === t("check_out") ? (
                        <DatePicker
                          showShortcuts={true}
                          useRange={true}
                          dateValue={endDateValue}
                          handleValueChange={handleEndValueChange}
                          className="h-10 bg-gray-100"
                        />
                      ) : (
                        <p className=" bg-gray-100 px-4 h-10 rounded-md flex items-center">
                          {text}
                        </p>
                      )}
                    </div>
                  </Button>
                );
              })}
              <Button className="text-white font-medium bg-primary px-4 h-10 rounded-md">
                <span>Search</span>
              </Button>
            </div>
            <div className="relative bg-black" ref={destinationCardRef}>
              {isDestinationOpen && <DestinationCard />}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomeSearch;
