import { useTranslation } from "react-i18next";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
interface IProps {
  showShortcuts?: boolean;
  useRange?: boolean;
  dateValue: DateValueType;
  handleValueChange: (newValue: DateValueType) => void;
}
const DatePicker = ({
  showShortcuts = false,
  useRange = false,
  dateValue,
  handleValueChange,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="remove-icon">
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
        .remove-icon div button svg{
          display: none !important;
        }
       .remove-icon div .flex.justify-center.space-x-3 {
      gap: 8px !important; 
    }
    .remove-icon div .flex.justify-center.space-x-3 > * {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
      `}
      </style>
    </div>
  );
};

export default DatePicker;
