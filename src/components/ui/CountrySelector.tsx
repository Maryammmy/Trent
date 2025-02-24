import { useState, useEffect } from "react";
import Select from "react-select";
import Image from "./Image";

interface Country {
  code: string;
  name: string;
  dial_code: string;
}
interface CountrySelectorProps {
  selectedCountry: string;
  onChange: (value: string) => void;
}
export default function CountrySelector({
  selectedCountry,
  onChange,
}: CountrySelectorProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/countries.json");
        if (response.ok) {
          const data: Country[] = await response.json();
          setCountries(data);
        }
      } catch {
        return null;
      }
    };
    fetchCountries();
  }, []);
  const formattedCountries = countries.map((country) => ({
    value: country.dial_code,
    label: (
      <div className="flex items-center">
        <Image
          imageUrl={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
          alt={country.name}
          className="w-6 h-4 mr-2 rounded"
        />
        <span>
          {country.name} ({country.dial_code})
        </span>
      </div>
    ),
  }));

  return (
    <div className="mb-4">
      <label htmlFor="country" className="block text-sm font-medium mb-1">
        Country code
      </label>
      <Select
        id="country"
        options={formattedCountries}
        value={formattedCountries.find((c) => c.value === selectedCountry)}
        onChange={(selected) => onChange(selected?.value || "+20")}
        className="w-full"
        styles={{
          control: (base, state) => ({
            ...base,
            padding: "7px",
            borderRadius: "8px",
            borderWidth: state.isFocused ? "2px" : "1px",
            borderStyle: "solid",
            borderColor: state.isFocused ? "#223f7f" : "#D1D5DB",
            boxShadow: "none",
            outline: "none",
            "&:hover": {
              borderColor: state.isFocused ? "#223f7f" : "#D1D5DB",
            },
          }),
        }}
      />
    </div>
  );
}
