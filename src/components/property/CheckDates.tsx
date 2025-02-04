import toast from "react-hot-toast";
import Counter from "../home/Counter";
import Button from "../ui/Button";
import DatePicker from "../ui/DatePicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function CheckDates() {
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();
  const [startDateValue, setStartDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDateValue, setEndDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const updateCounter = (value: number) => {
    setCounter((prevCounter) => prevCounter + value);
  };
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

  return (
    <div className="flex-1">
      <div className="border shadow-lg rounded-lg p-6 max-w-[400px]">
        <h2 className="text-black text-2xl font-medium pb-3">
          {t("add_dates_for_prices")}
        </h2>
        <div className="border border-stone-300 rounded-lg flex flex-col">
          <div className="grid grid-cols-2 border-b border-stone-300 text-sm">
            <Button className="ps-3 py-1 flex flex-col items-start">
              <h3 className="text-black font-bold">{t("check_in")}</h3>
              <DatePicker
                dateValue={startDateValue}
                handleValueChange={handleStartValueChange}
              />
            </Button>
            <Button className="border-l rtl:border-r rtl:border-l-0 ps-3 py-1 flex flex-col items-start">
              <h3 className="text-black font-bold">{t("check_out")}</h3>
              <DatePicker
                dateValue={endDateValue}
                handleValueChange={handleEndValueChange}
              />
            </Button>
          </div>
          <div className="ps-3 py-1 text-sm">
            <h2 className="text-black font-bold">{t("guests")}</h2>
            <div className="flex items-center gap-2 text-sm">
              <p className="text-secondary w-[90px] text-start">
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
          </div>
        </div>
        <Button className="bg-primary text-lg text-white font-semibold w-full py-2 rounded-md mt-4">
          <span>{t("check_availability")}</span>
        </Button>
      </div>
    </div>
  );
}

export default CheckDates;
