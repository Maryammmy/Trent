import DatePicker from "@/components/ui/DatePicker";
import { useTranslation } from "react-i18next";
import { DateValueType } from "react-tailwindcss-datepicker";

interface IProps {
  startDateValue: DateValueType;
  endDateValue: DateValueType;
  handleStartValueChange: (newValue: DateValueType) => void;
  handleEndValueChange: (newValue: DateValueType) => void;
}

function DateRange({
  startDateValue,
  endDateValue,
  handleStartValueChange,
  handleEndValueChange,
}: IProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-between">
      <div className="flex flex-col items-start">
        <label className="text-black font-bold text-lg mb-2">
          {t("check_in")}
        </label>
        <DatePicker
          width="100%"
          dateValue={startDateValue}
          handleValueChange={handleStartValueChange}
          className="bg-white border h-[49.6px] px-2 w-full rounded-md text-dark placeholder:text-dark"
        />
      </div>
      <div className="flex flex-col items-start">
        <label className="text-black font-bold text-lg mb-2">
          {t("check_out")}
        </label>
        <DatePicker
          width="100%"
          dateValue={endDateValue}
          handleValueChange={handleEndValueChange}
          className="bg-white border w-full h-[49.6px] px-2 rounded-md text-dark placeholder:text-dark"
        />
      </div>
    </div>
  );
}

export default DateRange;
