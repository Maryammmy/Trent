import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../components/ui/Input";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import Select from "../../../components/ui/Select";
import { priceType } from "../../../data";

const storedPrice = sessionStorage.getItem("price");
const storedSecurityDeposit = sessionStorage.getItem("security_deposit");
const storedPricingType = sessionStorage.getItem("pricing_type");

function PriceAndDeposit() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number | "">(
    storedPrice ? JSON.parse(storedPrice) : ""
  );
  const [securityDeposit, setSecurityDeposit] = useState<number | "">(
    storedSecurityDeposit ? JSON.parse(storedSecurityDeposit) : ""
  );
  const [pricingType, setPricingType] = useState<string>(
    storedPricingType || ""
  );
  const [priceError, setPriceError] = useState<string>("");
  const [depositError, setDepositError] = useState<string>("");
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "price" | "security_deposit"
  ) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = inputValue ? parseInt(inputValue, 10) : "";
    if (type === "price") {
      setPrice(numericValue);
      sessionStorage.setItem("price", JSON.stringify(numericValue));
      setPriceError(
        numericValue && (numericValue < 30 || numericValue > 20000)
          ? t("error_for_price")
          : ""
      );
    } else {
      setSecurityDeposit(numericValue);
      sessionStorage.setItem("security_deposit", JSON.stringify(numericValue));
      setDepositError(
        numericValue && (numericValue < 30 || numericValue > 20000)
          ? t("error_for_security_deposit")
          : ""
      );
    }
  };
  const handlePricingTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPricingType = event.target.value;
    setPricingType(newPricingType);
    sessionStorage.setItem("pricing_type", newPricingType);
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
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("pricing_type")}</label>
          <Select
            options={priceType}
            onChange={handlePricingTypeChange}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("price")}</label>
          <Input
            name="price"
            type="text"
            value={price || ""}
            onChange={(e) => handleChange(e, "price")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
            placeholder={t("enter_price_placeholder")}
          />
          {priceError && (
            <p className="text-red-600 text-xs md:text-sm">{priceError}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label className="font-medium">{t("security_deposit")}</label>
          <Input
            name="security_deposit"
            type="text"
            value={securityDeposit || ""}
            onChange={(e) => handleChange(e, "security_deposit")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-primary"
            placeholder={t("enter_security_deposit_placeholder")}
          />
          {depositError && (
            <p className="text-red-600 text-xs md:text-sm">{depositError}</p>
          )}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "50%"]} />
      <BackAndNext
        back="/become-a-host/min-max-price"
        next="/become-a-host/guest-rules"
        isNextDisabled={
          !price || !!priceError || !securityDeposit || !!depositError
        }
      />
    </div>
  );
}

export default PriceAndDeposit;
