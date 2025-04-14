import { useTranslation } from "react-i18next";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { CurrentLanguage } from "../../types";

interface IProps {
  dateValue: DateValueType;
  handleValueChange: (newValue: DateValueType) => void;
  className?: string;
}
const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const DatePicker = ({ dateValue, handleValueChange, className }: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="remove-icon z-[1000]">
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
      />
      <style>
        {`
          // .remove-icon div button svg{
          //   display: none !important;
          // }
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
