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
import CheckInModal from "./CheckInModal";

interface IProps {
  booking: IBooking;
}
function Booking({ booking }: IProps) {
  const { t } = useTranslation();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isCancelBookingOpen, setIsCancelBookingOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
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
  const today = new Date();
  const inDate = new Date(check_in);
  const outDate = new Date(check_out);
  const isDuringStay = today >= inDate && today <= outDate;
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
            {isDuringStay && status === "active" && (
              <div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCheckInOpen(true);
                  }}
                  className="py-2 w-40 bg-primary font-medium text-white rounded"
                >
                  {t("check_in_btn")}
                </Button>
              </div>
            )}
            {status === "active" && (
              <div className="">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCancelBookingOpen(true);
                  }}
                  className="py-2 w-40 bg-primary font-medium text-white rounded"
                >
                  {t("cancel_booking")}
                </Button>
              </div>
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
      {status === "active" && isCheckInOpen && (
        <CheckInModal
          bookingId={book_id}
          isOpen={isCheckInOpen}
          close={() => setIsCheckInOpen(false)}
        />
      )}
      {status === "active" && isCancelBookingOpen && (
        <CancelBookingModal
          bookingId={book_id}
          isOpen={isCancelBookingOpen}
          close={() => setIsCancelBookingOpen(false)}
        />
      )}
    </>
  );
}

export default Booking;
