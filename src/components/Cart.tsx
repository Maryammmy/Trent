import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { useTranslation } from "react-i18next";
import Rating from "./ui/Rating";
import { MapPin } from "lucide-react";
import Button from "./ui/Button";
import { IProperty } from "../interfaces/property/property";
import { baseURL } from "../services";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { togglePropertyAPI } from "../services/propertyService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface IProps {
  property: IProperty;
  refetch: () => void;
}
const uid = Cookies.get("user_id") || "";
function Cart({ property, refetch }: IProps) {
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
  const basePrice = Number(price);
  const toggleProperty = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!uid) {
      toast.error(t("fav_error"));
      return;
    }
    try {
      const response = await togglePropertyAPI({ uid, prop_id: id });
      if (
        response?.data?.response_code === 201 ||
        response?.data?.response_code === 200
      ) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link
      to={`/properties/${id}`}
      className="bg-white block shadow-md rounded-md overflow-hidden p-4"
      data-aos="fade-up"
    >
      {image_list?.length > 0 && (
        <div className="overflow-hidden rounded-md h-[230px] md:h-[300px]">
          <Carsoul
            showDot={true}
            showArrow={false}
            infinite={image_list?.length > 1}
          >
            {image_list?.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-md">
                <div
                  className="absolute top-2 right-2 z-10 cursor-pointer"
                  onClick={toggleProperty}
                >
                  {IS_FAVOURITE ? (
                    <FaHeart size={20} className="text-red-500" />
                  ) : (
                    <FaRegHeart size={20} className="text-white" />
                  )}
                </div>
                <div className="relative h-[230px] md:h-[300px]">
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
              {basePrice.toFixed(0)}
              {t("price_per_night")}
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
        <div className="flex gap-5 mt-2">
          <Button className="flex-[2] text-center zoom py-1 bg-primary rounded-md text-white font-medium">
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

export default Cart;
