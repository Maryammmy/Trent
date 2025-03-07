import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/hooks";
import Rating from "./ui/Rating";
import { MapPin } from "lucide-react";
import Button from "./ui/Button";
import { IProperty } from "../interfaces/propertyInterface";
import { truncateText } from "../utils/truncateText";
import { baseURL } from "../services";
import { FaHeart, FaRegHeart } from "react-icons/fa";
interface IProps {
  property: IProperty;
}
function Card({ property }: IProps) {
  const {
    IS_FAVOURITE,
    price,
    title,
    image_list,
    id,
    city,
    government_name,
    period_name,
  } = property;
  const { t } = useTranslation();
  const { enableTaxes } = useAppSelector((state) => state.taxes);
  const basePrice = Number(price);
  const taxRate = 14 / 100;
  const priceBeforeTaxes = basePrice;
  const priceWithTaxes = basePrice * (1 + taxRate);
  return (
    <div className="bg-white shadow-md rounded-md p-4 zoom">
      {image_list?.length > 0 && (
        <div className="overflow-hidden rounded-md">
          <Carsoul
            showDot={true}
            showArrow={false}
            left="5px"
            right="5px"
            padding="1px"
            infinite={image_list?.length > 1}
          >
            {image_list?.map((item, index) => (
              <Link key={index} to={`/properties/${id}`} className="relative">
                <div className="absolute top-2 right-2 z-10">
                  {IS_FAVOURITE ? (
                    <FaHeart size={20} className="text-white" />
                  ) : (
                    <FaRegHeart size={20} className="text-white" />
                  )}
                </div>
                <div className="rounded-md overflow-hidden h-[230px] bg-gray-200">
                  <Image
                    imageUrl={baseURL + item.img}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </Carsoul>
        </div>
      )}
      <div>
        <div className="flex items-start justify-between pt-2">
          <div>
            <h3 className="font-bold pb-1">{truncateText(title, 10)}</h3>
            <div className="flex gap-1">
              <p>{truncateText(city, 10)}</p>,
              <p>{truncateText(government_name, 10)}</p>
            </div>
          </div>
          <div>
            <div className="flex gap-1 font-medium pb-1">
              <span className="font-bold text-primary">
                {enableTaxes
                  ? `${priceBeforeTaxes.toFixed(0)} ${t("price_per_night")}`
                  : `${priceWithTaxes.toFixed(0)} ${t("price_per_night")}`}
              </span>
              <span className="text-dark">/ {period_name}</span>
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
          <Button className="flex-[2] zoom py-1 bg-primary rounded-md text-white font-medium">
            <span>Book Now</span>
          </Button>
          <Button className="flex-[1] zoom py-1 bg-[#CAE0FE] rounded-md flex justify-center items-center">
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
