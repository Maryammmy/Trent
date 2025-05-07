import { useState, useEffect, useRef } from "react";
import Image from "./Image";
import { ICountry } from "@/interfaces";
import Button from "./Button";
import Input from "./Input";
import useClickOutside from "@/hooks/useClickOutside";
import { IPropsCountrySelector } from "@/types";

function CountrySelector(props: IPropsCountrySelector) {
  const { selectedCountry } = props;
  const isReadOnly = "readOnly" in props;
  const isEditable = "onChange" in props;
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const countrySelectorRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
    setSearchText("");
  };
  useClickOutside(countrySelectorRef, handleClose);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/countries.json");
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        }
      } catch (error) {
        console.error("Failed to load countries", error);
      }
    };
    fetchCountries();
  }, []);
  const selected = countries.find((c) => c.dial_code === selectedCountry);
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase()) ||
      country.dial_code.includes(searchText)
  );

  return (
    <div className="relative min-w-fit" ref={countrySelectorRef}>
      <Button
        type="button"
        className="flex items-center gap-1"
        onClick={() => {
          if (!isReadOnly) {
            setOpen((prev) => !prev);
            setSearchText("");
          }
        }}
      >
        {selected && (
          <>
            <Image
              imageUrl={`https://flagcdn.com/w40/${selected.code.toLowerCase()}.png`}
              alt={selected.name}
              className="w-6 h-4 rounded"
            />
            <span>{selected.dial_code}</span>
          </>
        )}
      </Button>
      {!isReadOnly && open && (
        <div className="absolute z-50 mt-2 py-2 bg-white border rounded-lg shadow min-w-64 sm:min-w-80">
          <div className="px-3 pb-2">
            <Input
              type="search"
              placeholder="Search country..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full outline-none border rounded-lg p-2"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <Button
                key={country.code}
                type="button"
                onClick={() => {
                  if (!isReadOnly && isEditable) {
                    props.onChange(country.dial_code);
                    setOpen(false);
                    setSearchText("");
                  }
                }}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left"
              >
                <Image
                  imageUrl={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-6 h-4 rounded"
                />
                <span>
                  {country.name} ({country.dial_code})
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountrySelector;
