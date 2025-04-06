import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";

function MinMaxDays() {
  const { t } = useTranslation();
  const [minDays, setMinDays] = useState<string>("");
  const [maxDays, setMaxDays] = useState<string>("");
  const [errors, setErrors] = useState<{ min?: string; max?: string }>({});

  useEffect(() => {
    setMinDays(sessionStorage.getItem("min_days") || "");
    setMaxDays(sessionStorage.getItem("max_days") || "");
  }, []);

  const validate = (type: "min" | "max", value: string) => {
    const numValue = Number(value);
    const newErrors = { ...errors };
    if (isNaN(numValue)) {
      newErrors[type] = t("error_invalid_number");
      setErrors(newErrors);
      return;
    }
    if (numValue < 1 || numValue > 1000) {
      newErrors[type] = t("error_out_of_range");
      setErrors(newErrors);
      return;
    } else {
      delete newErrors[type];
    }
    if (type === "min") {
      if (maxDays && numValue >= Number(maxDays)) {
        newErrors.min = t("error_min_greater_than_max");
        newErrors.max = t("error_max_must_be_greater_than_min");
      } else {
        delete newErrors.min;
        delete newErrors.max;
      }
    }
    if (type === "max") {
      if (minDays && numValue <= Number(minDays)) {
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
    const newValue = e.target.value;
    if (/^\d+$/.test(newValue) || newValue === "") {
      if (type === "min") {
        setMinDays(newValue);
        sessionStorage.setItem("min_days", newValue);
      } else {
        setMaxDays(newValue);
        sessionStorage.setItem("max_days", newValue);
      }
      validate(type, newValue);
    }
  };

  const isNextDisabled: boolean =
    !minDays || !maxDays || !!errors.min || !!errors.max;

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
          <label className="font-medium">{t("min_days")}</label>
          <Input
            type="text"
            onChange={(e) => handleDaysChange(e, "min")}
            name="min_days"
            value={minDays}
            placeholder={t("min_days_placeholder")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
          {errors.min && <p className="text-red-500 text-sm">{errors.min}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("max_days")}</label>
          <Input
            type="text"
            onChange={(e) => handleDaysChange(e, "max")}
            name="max_days"
            value={maxDays}
            placeholder={t("max_days_placeholder")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
          {errors.max && <p className="text-red-500 text-sm">{errors.max}</p>}
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
