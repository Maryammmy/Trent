import { useEffect, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import DatePicker from "../../../components/ui/DatePicker";
import { useTranslation } from "react-i18next";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Button from "../../../components/ui/Button";
import { IRaiseRange } from "@/interfaces/becomeAHost";

export default function RaisePriceRanges() {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const [amount, setAmount] = useState<string>(""); // store as string for validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [ranges, setRanges] = useState<IRaiseRange[]>([]);

  const handleAmountChange = (value: string) => {
    const newErrors = { ...errors };
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    if (!value || isNaN(numericValue)) {
      newErrors.raise_amount = t("error_invalid_number");
    } else if (numericValue < 50 || numericValue > 10000) {
      newErrors.raise_amount = t("error_out_of_range_raise_price");
    } else {
      delete newErrors.raise_amount;
    }
    setErrors(newErrors);
    setAmount(value);
  };
  const handleAddRange = () => {
    const numericAmount = parseInt(amount, 10);
    if (
      startDate?.startDate &&
      endDate?.startDate &&
      !errors.raise_amount &&
      numericAmount >= 50 &&
      numericAmount <= 10000
    ) {
      const start = new Date(startDate.startDate).toISOString().split("T")[0];
      const end = new Date(endDate.startDate).toISOString().split("T")[0];
      const newRange: IRaiseRange = {
        start,
        end,
        amount: numericAmount,
      };
      const updatedRanges = [...ranges, newRange];
      setRanges(updatedRanges);
      sessionStorage.setItem(
        "raise_price_ranges",
        JSON.stringify(updatedRanges)
      );
      setStartDate({ startDate: null, endDate: null });
      setEndDate({ startDate: null, endDate: null });
      setAmount("");
    }
  };
  const handleDelete = (index: number) => {
    const updatedRanges = ranges.filter((_, i) => i !== index);
    setRanges(updatedRanges);
    sessionStorage.setItem("raise_price_ranges", JSON.stringify(updatedRanges));
  };
  useEffect(() => {
    const stored = sessionStorage.getItem("raise_price_ranges");
    if (stored) {
      setRanges(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">{t("raise_price_ranges")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
            {/* Start Date */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">{t("start_date")}</label>
              <DatePicker
                dateValue={startDate}
                handleValueChange={setStartDate}
                useRange={false}
                className="bg-gray-100 py-3 px-2 rounded-md text-dark"
              />
            </div>
            {/* End Date */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">{t("end_date")}</label>
              <DatePicker
                dateValue={endDate}
                handleValueChange={setEndDate}
                useRange={false}
                className="bg-gray-100 py-3 px-2 rounded-md text-dark"
              />
            </div>
          </div>
          {/* Amount */}
          <div className=" flex-col gap-1">
            <label className="font-medium">{t("raise_amount")}</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="bg-gray-100 py-3 px-3 rounded-md text-dark w-full outline-none focus:border-2 focus:border-primary"
              placeholder={t("enter_raise_charge")}
            />
            {errors.raise_amount && (
              <p className="text-sm text-red-600 mt-1">{errors.raise_amount}</p>
            )}
          </div>
          <Button
            onClick={handleAddRange}
            className="bg-primary w-full text-white py-3 px-4 rounded-md font-medium"
            disabled={!!errors.raise_amount || !amount}
          >
            {t("add_range")}
          </Button>

          <ul className="space-y-3">
            {ranges.map((range, index) => (
              <li
                key={index}
                className="flex justify-between gap-2 items-center bg-gray-100 px-4 py-3 rounded-md"
              >
                <span className="font-medium">
                  {range.start} → {range.end} (+{range.amount} EGP)
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

      <ProgressBarsWrapper progressBarsData={["100%", "100%", "49.8%"]} />
      <BackAndNext
        back="/become-a-host/excluding-dates"
        next="/become-a-host/price-and-deposit"
      />
    </div>
  );
}
