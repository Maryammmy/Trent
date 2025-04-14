import CheckDates from "@/components/property/CheckDates";
import Counter from "@/components/ui/Counter";
import { usePropertyInfoAPI } from "@/services/bookingService";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function Book() {
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = usePropertyInfoAPI(id);
  const propertyBook = data?.data?.data?.property_book_details;

  const updateCounter = (value: number) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  return (
    <div className="py-10 px-5 xl:px-20 mx-auto max-w-screen-xl min-h-screen">
      <div className="flex flex-col gap-10">
        <CheckDates
          minDays={Number(propertyBook?.min_days)}
          maxDays={Number(propertyBook?.max_days)}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-bold">{t("guest_count")}</h2>
          <div className="flex items-center gap-4">
            <p className="text-dark font-medium">
              Allowed maximum number of guests {propertyBook?.guest_count}
            </p>
            <Counter
              counter={counter}
              increaseCounter={() => updateCounter(1)}
              decreaseCounter={() => updateCounter(-1)}
              maxNumber={Number(propertyBook?.guest_count)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">{t("host_rules")}</h3>
          <p className="text-dark font-medium">{propertyBook?.guest_rules}</p>
          <div className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              id="terms"
              //   checked={acceptedTerms}
              //   onChange={handleTermsChange}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-dark">
              I accept host rules
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
