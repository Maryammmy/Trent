import RatingModal from "@/components/rating/RatingModal";
import Button from "@/components/ui/Button";
import Rating from "@/components/ui/Rating";
import { IBooking } from "@/interfaces/booking";
import { useQueryParam } from "@/utils/getQueryParam";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CancelBookingModal from "./CancelBookingModal";
import CheckInOutModal from "./CheckInOutModal";
import BookingCard from "@/components/booking/BookingCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    image_list,
    prop_title,
    book_id,
    total_paid,
    check_in,
    check_out,
    individual_rate,
    is_full_paid,
  } = booking;
  const navigate = useNavigate();
  const status = useQueryParam("status");
  const today = new Date();
  const inDate = new Date(check_in);
  const outDate = new Date(check_out);
  const isDuringStay = today >= inDate && today <= outDate;
  const handlePay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem("booking", JSON.stringify(booking));
    setTimeout(() => {
      navigate(`/account-settings/bookings/payment/${book_id}`, {
        state: {
          data: booking,
        },
      });
    }, 500);
  };
  return (
    <>
      <BookingCard
        img={image_list?.[0]?.img}
        title={prop_title}
        checkIn={check_in}
        checkOut={check_out}
        bookStatus={book_status}
        totalPaid={total_paid}
        isFullPaid={is_full_paid}
        path={`/account-settings/bookings/${book_id}?status=${status}`}
      >
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
          <div className="flex flex-col sm:items-center sm:flex-row gap-2 sm:gap-5 md:gap-10">
            {book_status === "Confirmed" && !is_full_paid && (
              <Button
                onClick={handlePay}
                className="py-2 w-40 bg-primary text-white rounded text-center"
              >
                {t("pay")}
              </Button>
            )}
            {isDuringStay && is_full_paid && book_status === "Confirmed" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  const isToday =
                    today.toDateString() === inDate.toDateString();
                  const isBeforeNoon = today.getHours() < 12;
                  if (isToday && isBeforeNoon) {
                    toast.error(t("cannot_check_in_before_12"));
                    return;
                  }
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
      </BookingCard>
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
