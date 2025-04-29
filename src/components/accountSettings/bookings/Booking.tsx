import Image from "@/components/ui/Image";
import { IBooking } from "@/interfaces/booking";
import { baseURL } from "@/services";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  booking: IBooking;
}
function Booking({ booking }: IProps) {
  const { t } = useTranslation();
  const { book_status, prop_img, prop_title, prop_price, book_id } = booking;
  return (
    <Link
      to={`/account-settings/bookings/${book_id}`}
      className="flex flex-wrap items-center gap-5 sm:gap-8 border p-4 rounded-2xl w-full text-start font-medium"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-md">
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]" />
        <div className="w-full h-full">
          <Image
            imageUrl={baseURL + prop_img}
            alt="property"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-1">
          <h3>{prop_title}</h3>
          <span>
            {prop_price} {t("price_per_night")}
          </span>
          <span className="text-primary">{book_status}</span>
        </div>
      </div>
    </Link>
  );
}

export default Booking;
