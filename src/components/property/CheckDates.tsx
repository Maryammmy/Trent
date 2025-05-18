import { useTranslation } from "react-i18next";
import DatePicker from "../ui/DatePicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import InputErrorMessage from "../ui/InputErrorMessage";
interface IProps {
  startDateValue: DateValueType;
  endDateValue: DateValueType;
  handleStartValueChange: (newValue: DateValueType) => void;
  handleEndValueChange: (newValue: DateValueType) => void;
  errors: { [key: string]: string };
  reservedDates?: string[];
}

function CheckDates({
  startDateValue,
  endDateValue,
  handleStartValueChange,
  handleEndValueChange,
  errors,
  reservedDates,
}: IProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <div className="flex flex-col items-start">
        <h3 className="text-black font-bold mb-2">{t("check_in")}</h3>
        <DatePicker
          dateValue={startDateValue}
          handleValueChange={handleStartValueChange}
          className="bg-gray-100 py-2 px-2 rounded-md text-dark placeholder:text-dark"
          reservedDates={reservedDates}
        />
        {errors.checkin && <InputErrorMessage msg={errors.checkin} />}
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-black font-bold mb-2">{t("check_out")}</h3>
        <DatePicker
          dateValue={endDateValue}
          handleValueChange={handleEndValueChange}
          className="bg-gray-100 py-2 px-2 rounded-md text-dark placeholder:text-dark"
          reservedDates={reservedDates}
        />
        {errors.checkout && <InputErrorMessage msg={errors.checkout} />}
      </div>
    </div>
  );
}

export default CheckDates;
