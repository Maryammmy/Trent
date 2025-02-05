import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../components/ui/Input";
import { priceBreakdown } from "../../../data/becomeAHost";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import BackAndNext from "../../../components/becomeAHost/BackAndNext";
import ProgressBarsWrapper from "../../../components/becomeAHost/ProgressBarsWrapper";

function Price() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const feesPercentage = 10;
  const userEarningPercentage = 90;
  const basePrice = price || 0;
  const guestServiceFee = Math.floor((basePrice * feesPercentage) / 100);
  const totalPrice = basePrice + guestServiceFee;
  const userEarning = Math.floor((totalPrice * userEarningPercentage) / 100);
  const breakdown = priceBreakdown(basePrice, guestServiceFee, totalPrice);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = inputValue ? parseInt(inputValue) : "";
    if (
      typeof numericValue === "number" &&
      (numericValue < 30 || numericValue > 20000)
    ) {
      setError(t("error_for_price"));
    } else {
      setError(null);
    }

    setPrice(numericValue);
  };
  return (
    <div className="py-10">
      <div className="hosting-layout flex flex-col justify-center max-w-screen-sm mx-auto px-5 md:px-0 pb-10">
        <h3 className="text-2xl md:text-3xl font-semibold pb-3">
          {t("price_title")}
        </h3>
        <p className="max-w-2xl text-secondary font-medium pb-10">
          {t("price_desc")}
        </p>
        <div
          className={`flex justify-center items-center ${
            error ? "pb-5" : "pb-10"
          }`}
        >
          <Input
            type="text"
            value={numberWithCommas(price || 0)}
            onChange={handlePriceChange}
            className="text-2xl font-bold text-center outline-none placeholder:text-gray-300"
            placeholder="0EGP"
          />
        </div>
        {error && (
          <p className="text-red-600 text-center font-medium pb-5 text-xs md:text-sm">
            {error}
          </p>
        )}
        <div className="max-w-md mx-auto">
          <div className="border p-4 rounded-lg border-black">
            {breakdown.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between gap-1 md:gap-5 text-sm md:text-lg font-medium mb-2 ${
                  item.label === "guest_service_fee" ? "border-b pb-6" : ""
                }`}
              >
                <h4>{t(item.label)}</h4>
                <span>
                  {numberWithCommas(item.value)}
                  <span className="whitespace-nowrap">EGP</span>
                </span>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-4 max-w-md mx-auto mt-6">
            <div
              className={`flex justify-between gap-1 md:gap-5 text-sm md:text-lg font-medium mb-2 `}
            >
              <h4>{t("you_earn")}</h4>
              <span>
                {numberWithCommas(userEarning)}
                <span className="whitespace-nowrap">EGP</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProgressBarsWrapper progressBarsData={["100%", "100%", "49.8%"]} />
      <BackAndNext
        back="/become-a-host/visibility"
        next="/become-a-host/discount"
        isNextDisabled={!price || !!error}
      />
    </div>
  );
}

export default Price;
