import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IProperty } from "../../interfaces/property";
import { baseURL } from "../../services";
import Carsoul from "../ui/Carsoul";
import Rating from "../ui/Rating";
import Image from "../ui/Image";
import { useToggleProperty } from "@/hooks/useToggleProperty";
import { getStoredCurrency } from "@/utils/getStoredCurrency";
interface IProps {
  property: IProperty;
}
const parsedCurrency = getStoredCurrency();

function Card({ property }: IProps) {
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
  } = property;
  const { t } = useTranslation();
  const basePrice = Math.round(Number(price) * Number(parsedCurrency?.rate));
  const { toggleFav } = useToggleProperty();
  return (
    <Link
      to={`/properties/${id}`}
      className="block w-[250px] h-full rounded-md overflow-hidden mb-4"
    >
      {image_list?.length > 0 && (
        <div className="overflow-hidden rounded-md h-[150px]">
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
                <div className="relative h-[150px]">
                  <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]"></div>
                  <div className="w-full h-full">
                    <Image
                      imageUrl={baseURL + item.img}
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
            <h3 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </h3>
          </div>
          <div className="flex items-center justify-end gap-1 font-medium">
            <span className="font-bold text-primary whitespace-nowrap overflow-hidden text-ellipsis">
              {basePrice}
              {t(parsedCurrency?.currency)}
            </span>
            <span className="text-dark whitespace-nowrap overflow-hidden text-ellipsis">
              /{period_name}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex items-center font-medium">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {city_name}
            </p>
            ,
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {government_name}
            </p>
          </div>
          <div className="flex gap-1 justify-end items-center font-medium">
            <Rating rating={Number(rate)} />
            <span className="text-sm text-dark">({Number(rate)})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
