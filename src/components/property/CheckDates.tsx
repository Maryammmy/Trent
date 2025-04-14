import DatePicker from "../ui/DatePicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  validateEndDate,
  validateStartDate,
} from "../../utils/handleChangeDate";
interface IProps {
  minDays: number;
  maxDays: number;
}

function CheckDates({ minDays, maxDays }: IProps) {
  const { t } = useTranslation();
  const [startDateValue, setStartDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDateValue, setEndDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleStartValueChange = (newValue: DateValueType) => {
    const validatedValue = validateStartDate(newValue, endDateValue, t);
    if (validatedValue) setStartDateValue(validatedValue);
  };
  const handleEndValueChange = (newValue: DateValueType) => {
    const validatedValue = validateEndDate(
      newValue,
      startDateValue,
      t,
      minDays,
      maxDays
    );
    if (validatedValue) setEndDateValue(validatedValue);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <div className="flex flex-col gap-2 items-start">
        <h3 className="text-black font-bold">{t("check_in")}</h3>
        <DatePicker
          dateValue={startDateValue}
          handleValueChange={handleStartValueChange}
          className="bg-gray-100 py-2 px-1 rounded-md text-dark placeholder:text-dark"
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h3 className="text-black font-bold">{t("check_out")}</h3>
        <DatePicker
          dateValue={endDateValue}
          handleValueChange={handleEndValueChange}
          className="bg-gray-100 py-2 px-1 rounded-md text-dark placeholder:text-dark"
        />
      </div>
    </div>
  );
}

export default CheckDates;
