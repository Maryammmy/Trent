import { useTranslation } from "react-i18next";
import { useState } from "react";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Input from "../../../components/ui/Input";

const storedMinDays = sessionStorage.getItem("min_days") || "";
const storedMaxDays = sessionStorage.getItem("max_days") || "";

function MinMaxDays() {
  const { t } = useTranslation();
  const [minDays, setMinDays] = useState<string>(storedMinDays);
  const [maxDays, setMaxDays] = useState<string>(storedMaxDays);

  const handleDaysChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const newValue = e.target.value;
    if (type === "min") {
      setMinDays(newValue);
      sessionStorage.setItem("min_days", newValue);
    } else {
      setMaxDays(newValue);
      sessionStorage.setItem("max_days", newValue);
    }
  };

  const isNextDisabled =
    !minDays ||
    !maxDays ||
    Number(minDays) < 1 ||
    Number(maxDays) < Number(minDays);

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
            type="number"
            min={1}
            onChange={(e) => handleDaysChange(e, "min")}
            name="min_days"
            value={minDays}
            placeholder={t("min_days_placeholder")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">{t("max_days")}</label>
          <Input
            type="number"
            min={1}
            onChange={(e) => handleDaysChange(e, "max")}
            name="max_days"
            value={maxDays}
            placeholder={t("max_days_placeholder")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
          />
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
