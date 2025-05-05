import { useState, useRef } from "react";
import Button from "../ui/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { currencies } from "@/data";

function CurrencySwitcher() {
  const [selectedCurrency, setSelectedCurrency] = useState("EGP");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));
  const handleSelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium text-white hover:text-secondary flex items-center"
      >
        {selectedCurrency}
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
