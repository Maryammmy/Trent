import { Link, useNavigate } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { useTranslation } from "react-i18next";
import Rating from "./ui/Rating";
import { MapPin } from "lucide-react";
import Button from "./ui/Button";
import { IProperty } from "../interfaces/property";
import { baseURL } from "../services";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useToggleProperty } from "@/hooks/useToggleProperty";
import { handleBookingNavigation } from "@/utils/handleBookingNavigation";
import { getStoredCurrency } from "@/utils/getStoredCurrency";

interface IProps {
  property: IProperty;
}
const parsedCurrency = getStoredCurrency();

function Card({ property }: IProps) {
  const navigate = useNavigate();
  const {
    IS_FAVOURITE,
    price,
    title,
    image_list,
    id,
    city_name,
    government_name,
    period_name,
    rate,
    owner_id,
  } = property;
  const { t } = useTranslation();
  const basePrice = Math.round(Number(price) * Number(parsedCurrency?.rate));
  const { toggleFav } = useToggleProperty();
  return (
    <Link
      to={`/properties/${id}`}
      className="bg-white shadow-md rounded-md overflow-hidden p-4"
      data-aos="fade-up"
    >
      {image_list?.length > 0 && (
        <div className="overflow-hidden rounded-md h-[230px] md:h-[300px]">
          <Carsoul
            showDot={true}
            showArrow={false}
            infinite={image_list?.length > 1}
          >
            {image_list?.slice(0, 5)?.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-md">
                <div
                  className="absolute top-2 right-2 z-10 cursor-pointer"
                  onClick={(e) => toggleFav(e, id)}
                >
                  {IS_FAVOURITE ? (
                    <FaHeart size={20} className="text-red-500" />
                  ) : (
                    <FaRegHeart size={20} className="text-white" />
                  )}
                </div>
                <div className="h-[230px] md:h-[300px]">
                  <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]"></div>
                  <div className="w-full h-full">
                    <Image
                      imageUrl={baseURL + item?.img}
                      alt={`Slide ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Carsoul>
        </div>
      )}
      <div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center">
            <h3 className="font-bold truncate">{title}</h3>
          </div>
          <div className="flex items-center justify-end gap-1 font-medium">
            <span className="font-bold text-primary truncate">
              {basePrice}
              {t(parsedCurrency?.currency)}
            </span>
            <span className="text-dark truncate">/{period_name}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex items-center font-medium">
            <p className="truncate">{city_name}</p>,
            <p className="truncate">{government_name}</p>
          </div>
          <div className="flex gap-1 justify-end items-center font-medium">
            <Rating rating={Number(rate)} />
            <span className="text-sm text-dark">({Number(rate)})</span>
          </div>
        </div>
        <div className="flex gap-5 mt-2">
          <Button
            onClick={(e) => {
              handleBookingNavigation({ e, owner_id, id, navigate });
            }}
            className="flex-[2] text-center zoom py-1 bg-primary rounded-md text-white font-medium"
          >
            {t("book_now")}
          </Button>
          <Button className="flex-[1] zoom py-1 bg-[#CAE0FE] rounded-md flex justify-center items-center">
            <span>
              <MapPin className="text-primary" size={22} />
            </span>
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default Card;
