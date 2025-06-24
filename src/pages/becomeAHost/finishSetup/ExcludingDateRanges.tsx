import { useEffect, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import DatePicker from "../../../components/ui/DatePicker";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Button from "../../../components/ui/Button";
import { validateEndDate, validateStartDate } from "@/utils/handleChangeDate";

export default function ExcludingDateRanges() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [ranges, setRanges] = useState<[string, string][]>([]);
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
      sessionStorage.setItem("date_ranges", JSON.stringify(updatedRanges));
      setStartDate({ startDate: null, endDate: null });
      setEndDate({ startDate: null, endDate: null });
    }
  };
  const handleDelete = (index: number) => {
    const updatedRanges = ranges.filter((_, i) => i !== index);
    setRanges(updatedRanges);
    sessionStorage.setItem("date_ranges", JSON.stringify(updatedRanges));
  };
  useEffect(() => {
    setRanges(
      sessionStorage.getItem("date_ranges")
        ? JSON.parse(sessionStorage.getItem("date_ranges") || "[]")
        : []
    );
  }, []);
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            {t("excluding_date_ranges")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
            {/* Start Date */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">{t("start_date")}</label>
              <DatePicker
                dateValue={startDate}
                handleValueChange={handleStartDateChange}
                useRange={false}
                className="bg-gray-100 py-2 px-2 rounded-md text-dark placeholder:text-dark"
              />
            </div>
            {/* End Date */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">{t("end_date")}</label>
              <DatePicker
                dateValue={endDate}
                handleValueChange={handleEndDateChange}
                useRange={false}
                className="bg-gray-100 py-2 px-2 rounded-md text-dark placeholder:text-dark"
              />
            </div>
          </div>
          <Button
            onClick={handleAddRange}
            className="bg-primary w-full text-white py-3 px-4 rounded-md font-medium"
          >
            {t("add_range")}
          </Button>
          <ul className="space-y-3">
            {ranges.map(([start, end], index) => (
              <li
                key={index}
                className="flex justify-between gap-2 items-center bg-gray-100 px-4 py-3 rounded-md"
              >
                <span className="font-medium">
                  {start} → {end}
                </span>
                <Button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:underline font-medium"
                >
                  {t("remove")}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "37.5%"]} />
      <BackAndNext
        back="/become-a-host/min-and-max-days"
        next="/become-a-host/price-and-deposit"
      />
    </div>
  );
}
