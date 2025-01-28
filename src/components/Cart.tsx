import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { images } from "../data";
import { FaStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();

  // Example data
  const distance = 18; // Example distance in kilometers
  const startDate = "May 11"; // Example start date
  const endDate = "May 15"; // Example end date
  const price = 500; // Example price per night
  const rating = 5.0; // Example rating

  return (
    <div className="block  w-full md:w-[354px] lg:w-[314px] xl:w-[305px] 2xl:w-[365px]">
      <div className="w-full h-[300px]  rounded-md overflow-hidden">
        <Carsoul showDot={true} left="8px" right="8px" padding="2px">
          {images?.map((item: string, index: number) => (
            <Link key={index} to={"/properties/1"}>
              <Image
                imageUrl={item}
                alt={`Slide ${index}`}
                className="w-full h-[300px] object-cover"
              />
            </Link>
          ))}
        </Carsoul>
      </div>
      <div className="px-2">
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-bold">{t("name")}</h3>
          <p className="flex gap-1 items-center font-medium">
            <FaStar size={15} />
            <span>{t("rating", { rating })}</span>
          </p>
        </div>
        <p className="text-stone-500 font-medium">
          {t("kilometers_away", { distance })}
        </p>
        <p className="text-stone-500 font-medium">
          {t("date_range", { start_date: startDate, end_date: endDate })}
        </p>
        <p className="font-medium">{t("price_per_night", { price })}</p>
      </div>
    </div>
  );
}

export default Cart;
