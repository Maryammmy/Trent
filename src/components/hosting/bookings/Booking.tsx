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
import CancelBookingModal from "./CancelBookingModal";
import ConfirmBookingModal from "./ConfirmBookingModal";

interface IProps {
  booking: IBooking;
}
function Booking({ booking }: IProps) {
  const { t } = useTranslation();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isCancelBookingOpen, setIsCancelBookingOpen] = useState(false);
  const [isConfirmBookingOpen, setIsConfirmBookingOpen] = useState(false);
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
        to={`/hosting/bookings/${book_id}?status=${status}`}
        className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-8 border p-4 rounded-2xl"
      >
        <div className="relative h-14 w-14 overflow-hidden rounded-md shrink-0">
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
            {t("EGP")}
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
          <div className="flex gap-5">
            {status === "active" && book_status === "Booked" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsConfirmBookingOpen(true);
                }}
                className="py-2 w-40 bg-primary font-medium text-white rounded"
              >
                {t("confirm_booking")}
              </Button>
            )}
            {status === "active" && book_status === "Booked" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsCancelBookingOpen(true);
                }}
                className="py-2 w-40 bg-primary font-medium text-white rounded"
              >
                {t("cancel_booking")}
              </Button>
            )}
          </div>
        </div>
      </Link>
      {book_status === "Completed" && (
        <RatingModal
          booking_id={book_id}
          individual_rate={individual_rate}
          isOpen={isRatingModalOpen}
          onClose={() => setIsRatingModalOpen(false)}
        />
      )}
      {isCancelBookingOpen &&
        status === "active" &&
        book_status === "Booked" && (
          <CancelBookingModal
            bookingId={book_id}
            isOpen={isCancelBookingOpen}
            close={() => setIsCancelBookingOpen(false)}
          />
        )}
      {isConfirmBookingOpen &&
        status === "active" &&
        book_status === "Booked" && (
          <ConfirmBookingModal
            bookingId={book_id}
            isOpen={isConfirmBookingOpen}
            close={() => setIsConfirmBookingOpen(false)}
          />
        )}
    </>
  );
}

export default Booking;
