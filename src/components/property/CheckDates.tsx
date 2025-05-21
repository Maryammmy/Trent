import { useTranslation } from "react-i18next";
import DatePicker from "../ui/DatePicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import InputErrorMessage from "../ui/InputErrorMessage";
import { useMediaQuery } from "react-responsive";
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
  const isLargeScreen = useMediaQuery({ minWidth: 1440 });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      <div className="flex flex-col items-start">
        <label className="text-black font-bold mb-2">{t("check_in")}</label>
        <DatePicker
          dateValue={startDateValue}
          handleValueChange={handleStartValueChange}
          className="bg-gray-100 py-2 px-2 rounded-md text-dark placeholder:text-dark"
          reservedDates={reservedDates}
          {...(isLargeScreen && { useRange: true })}
        />
        {errors.checkin && <InputErrorMessage msg={errors.checkin} />}
      </div>
      <div className="flex flex-col items-start">
        <label className="text-black font-bold mb-2">{t("check_out")}</label>
        <DatePicker
          dateValue={endDateValue}
          handleValueChange={handleEndValueChange}
          className="bg-gray-100 py-2 px-2 rounded-md text-dark placeholder:text-dark"
          reservedDates={reservedDates}
          {...(isLargeScreen && { useRange: true })}
        />
        {errors.checkout && <InputErrorMessage msg={errors.checkout} />}
      </div>
    </div>
  );
}

export default CheckDates;
