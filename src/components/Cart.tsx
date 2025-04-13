import { Link } from "react-router-dom";
import Carsoul from "./ui/Carsoul";
import Image from "./ui/Image";
import { useTranslation } from "react-i18next";
import Rating from "./ui/Rating";
import { MapPin } from "lucide-react";
import Button from "./ui/Button";
import { IProperty } from "../interfaces/property/property";
import { truncateText } from "../utils/truncateText";
import { baseURL } from "../services";
import { FaHeart } from "react-icons/fa";
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
      className="bg-white block shadow-md rounded-md overflow-hidden p-4 zoom"
      data-aos="fade-up"
    >
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
              <div key={index} className="relative">
                <div
                  className="absolute top-2 right-2 z-10 cursor-pointer"
                  onClick={toggleProperty}
                >
                  {IS_FAVOURITE ? (
                    <FaHeart size={20} className="text-red-500" />
                  ) : (
                    <FaHeart size={20} className="text-black/50" />
                  )}
                </div>
                <div className="rounded-md overflow-hidden h-[230px] md:h-[300px] bg-gray-200">
                  <Image
                    imageUrl={baseURL + item.img}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Carsoul>
        </div>
      )}
      <div>
        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold">{truncateText(title, 6)}</h3>
            <div className="flex">
              <p>{truncateText(city_name, 4)}</p>,
              <p>{truncateText(government_name, 4)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="flex gap-1 font-medium">
              <span className="font-bold text-primary">
                {truncateText(basePrice.toFixed(0), 4)}
                {t("price_per_night")}
              </span>
              <span className="text-dark">/{truncateText(period_name, 5)}</span>
            </div>
            <div className="flex gap-1 items-center font-medium">
              <Rating rating={Number(rate)} />
              <span className="text-sm text-dark">({Number(rate)})</span>
            </div>
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
