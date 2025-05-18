import { useTranslation } from "react-i18next";
import Datepicker from "react-tailwindcss-datepicker";
import {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker/dist/types";
import { CurrentLanguage } from "../../types";

interface IProps {
  dateValue: DateValueType;
  handleValueChange: (newValue: DateValueType) => void;
  className?: string;
  reservedDates?: string[];
}
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const DatePicker = ({
  dateValue,
  handleValueChange,
  className,
  reservedDates,
}: IProps) => {
  const { t } = useTranslation();
  const disabledDates: DateRangeType[] | undefined = reservedDates?.length
    ? reservedDates.map((d) => {
        const dateObj = typeof d === "string" ? new Date(d) : d;
        return { startDate: dateObj, endDate: dateObj };
      })
    : undefined;

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
        disabledDates={disabledDates}
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
