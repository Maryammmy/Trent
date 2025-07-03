import { useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import { validateEndDate, validateStartDate } from "@/utils/handleChangeDate";
import { useTranslation } from "react-i18next";
import DatePicker from "@/components/ui/DatePicker";
import Button from "@/components/ui/Button";
import { UseFormSetValue } from "react-hook-form";
import { PropertyNameInputs, RaiseRangeTuple } from "@/types";

interface IProps {
  setValue: UseFormSetValue<PropertyNameInputs>;
}
export default function RaisePriceRanges({ setValue }: IProps) {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [amount, setAmount] = useState<string>("");
  const [errors, setErrors] = useState<{ amount?: string }>({});
  const [ranges, setRanges] = useState<RaiseRangeTuple[]>([]);

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    const newErrors = { ...errors };
    if (!value || isNaN(numericValue)) {
      newErrors.amount = t("error_invalid_number");
    } else if (numericValue < 50 || numericValue > 10000) {
      newErrors.amount = t("error_out_of_range_raise_price");
    } else {
      delete newErrors.amount;
    }
    setErrors(newErrors);
    setAmount(value);
  };
  const handleAddRange = () => {
    const numericAmount = parseInt(amount, 10);
    if (
      startDate?.startDate &&
      endDate?.startDate &&
      !errors.amount &&
      numericAmount >= 50 &&
      numericAmount <= 10000
    ) {
      const start = new Date(startDate.startDate).toISOString().split("T")[0];
      const end = new Date(endDate.startDate).toISOString().split("T")[0];
      const newRange: RaiseRangeTuple = [start, end, numericAmount];
      const updatedRanges = [...ranges, newRange];
      setRanges(updatedRanges);
      setValue("inc_value_ranges", updatedRanges);
      setStartDate({ startDate: null, endDate: null });
      setEndDate({ startDate: null, endDate: null });
      setAmount("");
    }
  };
  const handleDelete = (index: number) => {
    const updatedRanges = ranges.filter((_, i) => i !== index);
    setRanges(updatedRanges);
    setValue("inc_value_ranges", updatedRanges);
  };

  return (
    <div>
      <h4 className="text-dark font-medium mb-1">{t("raise_price_ranges")}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("start_date")}</label>
          <DatePicker
            dateValue={startDate}
            handleValueChange={(val) => {
              const validated = validateStartDate(val, endDate);
              if (validated) setStartDate(val);
            }}
            useRange={false}
            className="bg-white py-3 px-2 rounded-md text-dark placeholder:text-dark"
          />
        </div>
        {/* End Date */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("end_date")}</label>
          <DatePicker
            dateValue={endDate}
            handleValueChange={(val) => {
              const validated = validateEndDate(val, startDate);
              if (validated) setEndDate(validated);
            }}
            useRange={false}
            className="bg-white py-3 px-2 rounded-md text-dark placeholder:text-dark"
          />
        </div>
      </div>
      {/* Amount */}
      <div className="flex flex-col gap-1 mt-4">
        <label className="font-medium">{t("raise_amount")}</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="bg-white py-3 px-3 rounded-md text-dark w-full outline-none focus:border-2 focus:border-primary"
          placeholder={t("enter_raise_charge")}
        />
        {errors.amount && (
          <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
        )}
      </div>
      <Button
        type="button"
        onClick={handleAddRange}
        className="bg-primary mt-4 w-full text-white py-3 px-4 rounded-md font-medium"
        disabled={!!errors.amount || !amount}
      >
        {t("add_range")}
      </Button>
      <ul className="space-y-3 mt-4">
        {ranges.map(([start, end, amount], index) => (
          <li
            key={index}
            className="flex justify-between gap-2 items-center bg-gray-100 px-4 py-3 rounded-md"
          >
            <span className="font-medium">
              {start} → {end} (+{amount} EGP)
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
  );
}
