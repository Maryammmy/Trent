import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

const DatePicker = () => {
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
    console.log("Selected Date Range: ", newValue);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-4 bg-white shadow-lg rounded-2xl w-96">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Select a Date Range
        </h2>
        <Datepicker
          value={dateValue}
          onChange={handleValueChange}
          showShortcuts={true}
          inputClassName="border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full rounded-lg px-4 py-2"
          placeholder="Pick a date range"
        />
      </div>
    </div>
  );
};

export default DatePicker;
