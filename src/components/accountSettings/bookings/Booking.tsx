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
import CheckInOutModal from "./CheckInOutModal";

interface IProps {
  booking: IBooking;
}
function Booking({ booking }: IProps) {
  const { t } = useTranslation();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isCancelBookingOpen, setIsCancelBookingOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
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
        className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border p-4 rounded-2xl font-semibold"
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
          <h3 className="text-lg">{prop_title}</h3>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
            <p>
              <span> {t("check_in")} :</span> {check_in}
            </p>
            <p>
              <span> {t("check_out")} :</span> {check_out}
            </p>
          </div>
          <span className="text-primary">{book_status}</span>
          <p className="text-lg">
            <span>{t("total")} :</span> {total_paid && total_paid} {t("EGP")}
          </p>
          {book_status === "Completed" && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsRatingModalOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <Rating rating={Number(individual_rate?.rate) || 0} />
              <span className="text-sm text-dark">
                ({individual_rate?.rate || 0})
              </span>
            </Button>
          )}
          {status === "active" && (
            <div className="flex items-center gap-10">
              {isDuringStay && book_status === "Confirmed" && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCheckInOpen(true);
                  }}
                  className="py-2 w-40 bg-primary text-white rounded"
                >
                  {t("check_in_btn")}
                </Button>
              )}
              {book_status === "Check_in" && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCheckOutOpen(true);
                  }}
                  className="py-2 w-40 bg-primary text-white rounded"
                >
                  {t("check_out_btn")}
                </Button>
              )}
              {(book_status === "Booked" || book_status === "Confirmed") && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCancelBookingOpen(true);
                  }}
                  className="py-2 w-40 bg-primary text-white rounded"
                >
                  {t("cancel_booking")}
                </Button>
              )}
            </div>
          )}
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
      {status === "active" && book_status === "Confirmed" && isCheckInOpen && (
        <CheckInOutModal
          isOpen={isCheckInOpen}
          close={() => setIsCheckInOpen(false)}
          bookingId={book_id}
          isCheckIn={true}
        />
      )}
      {status === "active" && book_status === "Check_in" && isCheckOutOpen && (
        <CheckInOutModal
          isOpen={isCheckOutOpen}
          close={() => setIsCheckOutOpen(false)}
          bookingId={book_id}
          isCheckIn={false}
        />
      )}
      {status === "active" &&
        isCancelBookingOpen &&
        (book_status === "Confirmed" || book_status === "Booked") && (
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
