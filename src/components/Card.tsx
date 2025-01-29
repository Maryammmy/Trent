import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { images } from "../data";
import { FaStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function Card() {
  const { t } = useTranslation();

  const distance = 18;
  const startDate = "May 11";
  const endDate = "May 15";
  const price = 500;
  const rating = 5.0;

  return (
    <div>
      <div>
        <Carsoul showDot={true} left="8px" right="8px" padding="2px">
          {images?.map((item: string, index: number) => (
            <Link key={index} to={"/properties/1"}>
              <div className="rounded-md overflow-hidden h-[300px]">
                <Image
                  imageUrl={item}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
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

export default Card;
