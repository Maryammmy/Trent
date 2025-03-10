import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../components/ui/Input";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Select from "../../../components/ui/Select";
import SelectSkeleton from "../../../components/skeleton/SelectSkeleton";
import { useFiltersAPI } from "../../../services/filtersService";
import { IPeriod } from "../../../interfaces";

const storedPrice = sessionStorage.getItem("price");
const storedSecurityDeposit = sessionStorage.getItem("security_deposit");
const storedPeriod = sessionStorage.getItem("period");

function PriceAndDeposit() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number | "">(
    storedPrice ? JSON.parse(storedPrice) : ""
  );
  const [securityDeposit, setSecurityDeposit] = useState<number | "">(
    storedSecurityDeposit ? JSON.parse(storedSecurityDeposit) : ""
  );
  const [period, setPeriod] = useState<string>(storedPeriod || "");
  const { data } = useFiltersAPI();
  const periods: IPeriod[] = data?.data?.data?.period_list;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "price" | "security_deposit"
  ) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = inputValue ? parseInt(inputValue, 10) : "";
    if (type === "price") {
      setPrice(numericValue);
      sessionStorage.setItem("price", JSON.stringify(numericValue));
    } else {
      setSecurityDeposit(numericValue);
      sessionStorage.setItem("security_deposit", JSON.stringify(numericValue));
    }
  };
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = event.target.value;
    setPeriod(newPeriod);
    sessionStorage.setItem("period", newPeriod);
  };

  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("price_and_deposit_title")}
        </h3>
        <p className="max-w-2xl text-dark font-medium pb-10">
          {t("price_and_deposit_desc")}
        </p>
        <div className="flex flex-col gap-2 pb-4">
          <label className="text-lg font-bold">{t("period")}</label>
          {!periods ? (
            <SelectSkeleton />
          ) : periods?.length ? (
            <Select
              onChange={handlePeriodChange}
              options={periods?.map((period) => ({
                value: period.id,
                label: period.name,
              }))}
              value={period}
              className="bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            />
          ) : (
            <p className="border py-3 px-2 rounded-md bg-white">
              No period found
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("price")}</label>
          <Input
            name="price"
            type="text"
            value={price || ""}
            onChange={(e) => handleChange(e, "price")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            placeholder={t("enter_price_placeholder")}
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("security_deposit")}</label>
          <Input
            name="security_deposit"
            type="text"
            value={securityDeposit || ""}
            onChange={(e) => handleChange(e, "security_deposit")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            placeholder={t("enter_security_deposit_placeholder")}
          />
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "50%"]} />
      <BackAndNext
        back="/become-a-host/min-and-max-days"
        next="/become-a-host/guest-rules"
        isNextDisabled={!price || !period}
      />
    </div>
  );
}

export default PriceAndDeposit;
