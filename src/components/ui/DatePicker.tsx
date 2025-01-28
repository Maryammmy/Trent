import { useState } from "react";
import { useTranslation } from "react-i18next";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
interface IProps {
  showShortcuts?: boolean;
  useRange?: boolean;
}
const DatePicker = ({ showShortcuts = false, useRange = false }: IProps) => {
  const { t } = useTranslation();
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
    console.log("Selected Date Range: ", newValue);
  };

  return (
    <div className="relative">
      <Datepicker
        popoverDirection="down"
        showShortcuts={showShortcuts}
        useRange={useRange}
        showFooter={true}
        value={dateValue}
        asSingle={true}
        onChange={handleValueChange}
        inputClassName="outline-none text-secondary  w-20 font-medium placeholder:text-secondary"
        placeholder={t("add_dates")}
      />
      <style>
        {`
        .relative div button svg{
          display: none !important;
        }
       .relative div .flex.justify-center.space-x-3 {
      gap: 8px !important; 
    }
    .relative div .flex.justify-center.space-x-3 > * {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
      `}
      </style>
    </div>
  );
};

export default DatePicker;
