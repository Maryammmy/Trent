import RatingModal from "@/components/rating/RatingModal";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Rating from "@/components/ui/Rating";
import { IBooking } from "@/interfaces/booking";
import { baseURL } from "@/services";
import { useQueryParam } from "@/utils/getQueryParam";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  booking: IBooking;
}
function Booking({ booking }: IProps) {
  const { t } = useTranslation();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const {
    book_status,
    prop_img,
    prop_title,
    book_id,
    total_paid,
    check_in,
    check_out,
    individual_rate,
  } = booking;
  const status = useQueryParam("status");
  return (
    <>
      <Link
        to={`/account-settings/bookings/${book_id}?status=${status}`}
        className="flex flex-wrap items-center gap-5 sm:gap-8 border p-4 rounded-2xl"
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
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{prop_title}</h3>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-5 font-medium">
            <p>
              <span> {t("check_in")} :</span> {check_in}
            </p>
            <p>
              <span> {t("check_out")} :</span> {check_out}
            </p>
          </div>
          <p className="text-lg font-semibold">
            <span>{t("total")} :</span> {total_paid && parseInt(total_paid)}{" "}
            {t("price_per_night")}
          </p>
          <span className="text-primary font-semibold">{book_status}</span>
          {book_status === "Completed" && (
            <div className="flex items-center gap-5">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsRatingModalOpen(true);
                }}
                className="flex items-center gap-2"
              >
                <Rating rating={Number(individual_rate?.rate) || 0} />
                <span className="text-sm font-semibold text-dark">
                  ({individual_rate?.rate || 0})
                </span>
              </Button>
            </div>
          )}
        </div>
      </Link>
      <RatingModal
        booking_id={book_id}
        individual_rate={individual_rate}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />
    </>
  );
}

export default Booking;
