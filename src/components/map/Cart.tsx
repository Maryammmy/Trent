import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IProperty } from "../../interfaces/property/propertyInterface";
import { baseURL } from "../../services";
import { togglePropertyAPI } from "../../services/propertyService";
import { useAppSelector } from "../../store/hooks";
import { truncateText } from "../../utils/truncateText";
import Carsoul from "../ui/Carsoul";
import Rating from "../ui/Rating";
import Image from "../ui/Image";
interface IProps {
  property: IProperty;
}

const uid = Cookies.get("user_id") || "";
function Cart({ property }: IProps) {
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
  const { enableTaxes } = useAppSelector((state) => state.taxes);
  const basePrice = Number(price);
  const taxRate = 14 / 100;
  const priceBeforeTaxes = basePrice;
  const priceWithTaxes = basePrice * (1 + taxRate);
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
        toast.success(response?.data?.response_message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[250px] h-full rounded-md overflow-hidden mb-4">
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
                <div
                  className="absolute top-2 right-2 z-10 cursor-pointer"
                  onClick={toggleProperty}
                >
                  {IS_FAVOURITE ? (
                    <FaHeart size={20} className="text-white" />
                  ) : (
                    <FaRegHeart size={20} className="text-white" />
                  )}
                </div>
                <div className="rounded-md overflow-hidden h-[150px] w-full">
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
        <div className="flex sm:flex-row flex-col gap-1 items-start justify-between pt-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold">{truncateText(title, 8)}</h3>
            <div className="flex flex-row gap-1">
              <span>{truncateText(city_name, 5)}</span>
              <span>{truncateText(government_name, 5)}</span>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <div className="flex gap-1 font-medium">
              <span className="font-bold text-primary">
                {enableTaxes
                  ? `${truncateText(priceBeforeTaxes.toFixed(0), 5)} ${t(
                      "price_per_night"
                    )}`
                  : `${truncateText(priceWithTaxes.toFixed(0), 5)} ${t(
                      "price_per_night"
                    )}`}
              </span>
              <span className="text-dark">/ {period_name}</span>
            </div>
            <div className="flex gap-1 items-center font-medium">
              <Rating rating={Number(rate)} />
              <span className="text-sm text-dark">({Number(rate)})</span>
            </div>
          </div>
        </div>
        {enableTaxes && (
          <span className="text-sm text-dark pt-1">
            {t("total_before_taxes")}
          </span>
        )}
      </div>
    </div>
  );
}

export default Cart;
