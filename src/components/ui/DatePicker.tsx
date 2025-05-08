import { useTranslation } from "react-i18next";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { CurrentLanguage } from "../../types";
import { getDisabledDatesArray } from "@/utils/disabledDatesArray";

interface IProps {
  dateValue: DateValueType;
  handleValueChange: (newValue: DateValueType) => void;
  className?: string;
  nextAvailableDate?: string;
}
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const DatePicker = ({
  dateValue,
  handleValueChange,
  className,
  nextAvailableDate,
}: IProps) => {
  const { t } = useTranslation();
  const disabledDatesArray = nextAvailableDate
    ? getDisabledDatesArray(nextAvailableDate)
    : [];

  return (
    <div className="remove-icon">
      <Datepicker
        i18n={currentLanguage}
        popoverDirection="down"
        useRange={true}
        value={dateValue}
        showFooter={true}
        asSingle={true}
        onChange={handleValueChange}
        inputClassName={`outline-none font-medium ${className}`}
        placeholder={t("add_date")}
        disabledDates={
          disabledDatesArray.length ? disabledDatesArray : undefined
        }
      />
      <style>
        {`
      :dir(rtl) .remove-icon div button.absolute {
  right: 80% !important;
}
        .remove-icon div button.line-through{
         color: #f87171 !important;
         cursor: not-allowed !important;
        }
       .remove-icon div .flex.justify-center.space-x-3 {
      gap: 8px !important; 
    }
    .remove-icon div .flex.justify-center.space-x-3 > * {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
         @media (max-width: 767px) {
        .remove-icon div div.transition-all{
         width: 250px !important;
         }
        }
      `}
      </style>
    </div>
  );
};

export default DatePicker;
