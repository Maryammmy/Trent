import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { images } from "../data";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/hooks";
import Rating from "./ui/Rating";
import { MapPin } from "lucide-react";
import Button from "./ui/Button";
import { FaHeart } from "react-icons/fa";

function Card() {
  const { t } = useTranslation();
  const { enableTaxes } = useAppSelector((state) => state.taxes);
  const basePrice = 500;
  const taxRate = 14 / 100;
  const priceBeforeTaxes = basePrice;
  const priceWithTaxes = basePrice * (1 + taxRate);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="overflow-hidden rounded-md">
        <Carsoul
          showDot={true}
          showArrow={false}
          left="5px"
          right="5px"
          padding="1px"
        >
          {images?.map((item: string, index: number) => (
            <Link key={index} to={"/properties/1"} className="relative">
              <div className="absolute top-2 right-1 z-10">
                <FaHeart size={20} className="text-primary" />
              </div>
              <div className="rounded-md overflow-hidden h-[230px]">
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
      <div>
        <div className="flex items-start justify-between pt-2">
          <div>
            <h3 className="font-bold pb-1">{t("name")}</h3>
            <p className="text-dark font-medium">Cairo,Marina</p>
          </div>
          <div>
            <div className="flex gap-1 font-medium pb-1">
              <span className="font-bold text-primary">
                {enableTaxes
                  ? t("price_per_night", {
                      price: priceBeforeTaxes.toFixed(0),
                    })
                  : t("price_per_night", {
                      price: priceWithTaxes.toFixed(0),
                    })}
              </span>

              <span className="text-dark">/ night</span>
            </div>
            <div className="flex gap-1 justify-between items-center font-medium">
              <Rating rating={4} />
              <span className="text-sm text-dark">(4)</span>
            </div>
          </div>
        </div>
        {enableTaxes && (
          <p className="text-sm text-dark pt-1">{t("total_before_taxes")}</p>
        )}
        <div className="flex gap-5 mt-2">
          <Button className="flex-[2] py-1 bg-primary rounded-md text-white font-medium">
            <span>Book Now</span>
          </Button>
          <Button className="flex-[1] py-1 bg-[#CAE0FE] rounded-md flex justify-center items-center">
            <span>
              <MapPin className="text-primary" size={22} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
