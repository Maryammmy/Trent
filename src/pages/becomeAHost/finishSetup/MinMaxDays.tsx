import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";
import InputErrorMessage from "@/components/ui/InputErrorMessage";

function MinMaxDays() {
  const { t } = useTranslation();
  const [minDays, setMinDays] = useState<number | "">("");
  const [maxDays, setMaxDays] = useState<number | "">("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMinDays(
      sessionStorage.getItem("min_days")
        ? JSON.parse(sessionStorage.getItem("min_days") || '""')
        : ""
    );
    setMaxDays(
      sessionStorage.getItem("max_days")
        ? JSON.parse(sessionStorage.getItem("max_days") || '""')
        : ""
    );
  }, []);

  const validate = (type: "min" | "max", value: number) => {
    const newErrors = { ...errors };
    if ((value && value < 1) || value > 1000) {
      newErrors[type] = t("error_out_of_range_days");
      setErrors(newErrors);
      return;
    } else {
      delete newErrors[type];
    }
    if (type === "min") {
      if (maxDays && value >= Number(maxDays)) {
        newErrors.min = t("error_min_greater_than_max");
        newErrors.max = t("error_max_must_be_greater_than_min");
      } else {
        delete newErrors.min;
        delete newErrors.max;
      }
    }
    if (type === "max") {
      if (minDays && value <= Number(minDays)) {
        newErrors.max = t("error_max_must_be_greater_than_min");
        newErrors.min = t("error_min_greater_than_max");
      } else {
        delete newErrors.max;
        delete newErrors.min;
      }
    }
    setErrors(newErrors);
  };
  const handleDaysChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(inputValue);
    if (type === "min") {
      setMinDays(numericValue);
      sessionStorage.setItem("min_days", JSON.stringify(numericValue));
    } else {
      setMaxDays(numericValue);
      sessionStorage.setItem("max_days", JSON.stringify(numericValue));
    }
    validate(type, numericValue);
  };
  const isNextDisabled: boolean =
    !minDays || !maxDays || Object.keys(errors).length > 0;

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("min_max_days")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-5">
          {t("min_max_days_desc")}
        </p>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">
            {t("min_days")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            onChange={(e) => handleDaysChange(e, "min")}
            name="min_days"
            value={minDays || ""}
            placeholder={t("min_days_placeholder")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
          {errors.min && <InputErrorMessage msg={errors.min} />}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            {t("max_days")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            onChange={(e) => handleDaysChange(e, "max")}
            name="max_days"
            value={maxDays || ""}
            placeholder={t("max_days_placeholder")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
          {errors.max && <InputErrorMessage msg={errors.max} />}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "25%"]} />
      <BackAndNext
        back="/become-a-host/finish-setup"
        next="/become-a-host/price-and-deposit"
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}

export default MinMaxDays;
