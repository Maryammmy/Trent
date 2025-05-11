import { useState, useRef } from "react";
import Button from "../ui/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { currencies } from "@/data";
import { currencyRateAPI } from "@/services/currencyService";

const storedCurrency = sessionStorage.getItem("currency");
const parsedCurrency = storedCurrency ? JSON.parse(storedCurrency) : null;
function CurrencySwitcher() {
  const currency = parsedCurrency?.currency || "EGP";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const handleSelect = async (currency: string) => {
    if (currency === "EGP") {
      sessionStorage.setItem("currency", JSON.stringify({ currency, rate: 1 }));
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 500);
      return;
    }
    try {
      const response = await currencyRateAPI(currency);
      const rate = response?.data?.data?.currency_rate;
      if (rate) {
        sessionStorage.setItem("currency", JSON.stringify({ currency, rate }));
        setIsOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium text-white hover:text-secondary flex items-center"
      >
        {currency}
      </Button>
      {isOpen && (
        <div className="py-3 font-medium absolute z-50 top-10 bg-white border rounded-lg shadow-lg min-w-24">
          <div className="max-h-56 overflow-y-auto overflow-x-hidden">
            {currencies.map((currency) => (
              <Button
                key={currency}
                onClick={() => handleSelect(currency)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {currency}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencySwitcher;
