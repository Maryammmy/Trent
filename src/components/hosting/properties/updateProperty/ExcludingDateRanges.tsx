import { useEffect, useMemo, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import { validateEndDate, validateStartDate } from "@/utils/handleChangeDate";
import { useTranslation } from "react-i18next";
import DatePicker from "@/components/ui/DatePicker";
import Button from "@/components/ui/Button";
import { usePropertyDatesAPI } from "@/services/bookingService";
import { groupConsecutiveDates } from "@/utils/groupConsecutiveDates";
import { UseFormSetValue } from "react-hook-form";
import { PropertyNameInputs } from "@/types";

interface IProps {
  id: string | undefined;
  setValue: UseFormSetValue<PropertyNameInputs>;
}

export default function ExcludingDateRanges({ id, setValue }: IProps) {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const { data } = usePropertyDatesAPI(id);
  const dates = data?.data?.data?.date_list;
  const groupDates = useMemo(() => {
    return groupConsecutiveDates(dates);
  }, [dates]);
  const [ranges, setRanges] = useState<[string, string][]>([]);
  useEffect(() => {
    if (groupDates?.length) {
      setRanges(groupDates);
    }
  }, [groupDates]);
  const handleStartDateChange = (newValue: DateValueType) => {
    const validatedValue = validateStartDate(newValue, endDate);
    if (validatedValue) {
      setStartDate(newValue);
    }
  };

  const handleEndDateChange = (newValue: DateValueType) => {
    const validatedValue = validateEndDate(newValue, startDate);
    if (validatedValue) {
      setEndDate(validatedValue);
    }
  };

  const handleAddRange = () => {
    if (startDate?.startDate && endDate?.startDate) {
      const start = new Date(startDate.startDate).toISOString().split("T")[0];
      const end = new Date(endDate.startDate).toISOString().split("T")[0];
      const updatedRanges: [string, string][] = [...ranges, [start, end]];
      setRanges(updatedRanges);
      setValue("date_ranges", updatedRanges);
      setStartDate({ startDate: null, endDate: null });
      setEndDate({ startDate: null, endDate: null });
    }
  };

  const handleDelete = (index: number) => {
    const updatedRanges = ranges.filter((_, i) => i !== index);
    setRanges(updatedRanges);
    setValue("date_ranges", updatedRanges);
  };

  return (
    <div>
      <h4 className="text-dark font-medium mb-1">
        {t("excluding_date_ranges")}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("start_date")}</label>
          <DatePicker
            dateValue={startDate}
            handleValueChange={handleStartDateChange}
            useRange={false}
            className="bg-white py-3 px-2 rounded-md text-dark placeholder:text-dark"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("end_date")}</label>
          <DatePicker
            dateValue={endDate}
            handleValueChange={handleEndDateChange}
            useRange={false}
            className="bg-white py-3 px-2 rounded-md text-dark placeholder:text-dark"
          />
        </div>
      </div>
      <Button
        type="button"
        onClick={handleAddRange}
        className="bg-primary mt-4 w-full text-white py-3 px-4 rounded-md font-medium"
      >
        {t("add_range")}
      </Button>

      <ul className="space-y-3 mt-4">
        {ranges.map(([start, end], index) => (
          <li
            key={index}
            className="flex justify-between gap-2 items-center bg-white px-4 py-3 rounded-md"
          >
            <span className="font-medium">
              {start} → {end}
            </span>
            <Button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-red-600 hover:underline font-medium"
            >
              {t("remove")}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
