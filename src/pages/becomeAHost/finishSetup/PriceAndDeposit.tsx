import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../components/ui/Input";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";
import InputErrorMessage from "@/components/ui/InputErrorMessage";

function PriceAndDeposit() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number | "">("");
  const [securityDeposit, setSecurityDeposit] = useState<number | "">("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setPrice(
      sessionStorage.getItem("price")
        ? JSON.parse(sessionStorage.getItem("price") || '""')
        : ""
    );
    setSecurityDeposit(
      sessionStorage.getItem("security_deposit")
        ? JSON.parse(sessionStorage.getItem("security_deposit") || '""')
        : ""
    );
  }, []);
  const validate = (type: "price" | "security_deposit", value: number) => {
    const newErrors = { ...errors };
    if ((value && value < 50) || value > 250000) {
      newErrors[type] = t("error_out_of_range_price");
    } else {
      delete newErrors[type];
    }
    setErrors(newErrors);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "price" | "security_deposit"
  ) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const numericValue = Number(inputValue);
    if (type === "price") {
      setPrice(numericValue);
      sessionStorage.setItem("price", JSON.stringify(numericValue));
    } else {
      setSecurityDeposit(numericValue);
      sessionStorage.setItem("security_deposit", JSON.stringify(numericValue));
    }
    validate(type, numericValue);
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
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium flex items-center">
            {t("price")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <Input
            name="price"
            type="text"
            value={price || ""}
            onChange={(e) => handleChange(e, "price")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            placeholder={t("enter_price_placeholder")}
          />
          {errors.price && <InputErrorMessage msg={errors.price} />}
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <label className="font-medium flex items-center">
            {t("security_deposit")}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <Input
            name="security_deposit"
            type="text"
            value={securityDeposit || ""}
            onChange={(e) => handleChange(e, "security_deposit")}
            className="outline-none bg-zinc-50 border border-dark py-3 px-2 rounded-md focus:border-2 focus:border-primary"
            placeholder={t("enter_security_deposit_placeholder")}
          />
          {errors.security_deposit && (
            <InputErrorMessage msg={errors.security_deposit} />
          )}
        </div>
      </div>
      <ProgressBarsWrapper progressBarsData={["100%", "100%", "50%"]} />
      <BackAndNext
        back="/become-a-host/min-and-max-days"
        next="/become-a-host/guest-rules-and-cancellation-policies"
        isNextDisabled={!price || Object.keys(errors).length > 0}
      />
    </div>
  );
}

export default PriceAndDeposit;
