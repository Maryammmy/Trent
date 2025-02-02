import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { images } from "../data";
import { FaStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/hooks";

function Card() {
  const { t } = useTranslation();
  const { enableTaxes } = useAppSelector((state) => state.taxes);
  const distance = 18;
  const startDate = "May 11";
  const endDate = "May 15";
  const basePrice = 500;
  const taxRate = 14 / 100;

  const priceBeforeTaxes = basePrice;
  const priceWithTaxes = basePrice * (1 + taxRate);

  return (
    <div>
      <div className="overflow-hidden rounded-md">
        <Carsoul showDot={true} left="5px" right="5px" padding="1px">
          {images?.map((item: string, index: number) => (
            <Link key={index} to={"/properties/1"}>
              <div className="rounded-md overflow-hidden h-[280px]">
                <Image
                  imageUrl={item}
                  alt={`Slide ${index}`}
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
            </Link>
          ))}
        </Carsoul>
      </div>
      <div className="px-2">
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-bold">{t("name")}</h3>
          <p className="flex gap-1 items-center font-medium">
            <FaStar size={15} />
            <span>{t("rating", { rating: 5.0 })}</span>
          </p>
        </div>
        <p className="text-stone-500 font-medium">
          {t("kilometers_away", { distance })}
        </p>
        <p className="text-stone-500 font-medium">
          {t("date_range", { start_date: startDate, end_date: endDate })}
        </p>
        <p className="font-medium">
          {enableTaxes
            ? t("price_per_night", { price: priceBeforeTaxes.toFixed(2) })
            : t("price_per_night", { price: priceWithTaxes.toFixed(2) })}
        </p>
        {enableTaxes && (
          <p className="text-sm text-gray-500">{t("total_before_taxes")}</p>
        )}
      </div>
    </div>
  );
}

export default Card;
