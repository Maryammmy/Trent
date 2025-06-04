import Button from "@/components/ui/Button";
import { IBooking } from "@/interfaces/booking";
import { useQueryParam } from "@/utils/getQueryParam";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CancelBookingModal from "./CancelBookingModal";
import ConfirmBookingModal from "./ConfirmBookingModal";
import BookingCard from "@/components/booking/BookingCard";

interface IProps {
  booking: IBooking;
}
function Booking({ booking }: IProps) {
  const { t } = useTranslation();
  const [isCancelBookingOpen, setIsCancelBookingOpen] = useState(false);
  const [isConfirmBookingOpen, setIsConfirmBookingOpen] = useState(false);
  const {
    book_status,
    image_list,
    prop_title,
    book_id,
    total_paid,
    check_in,
    check_out,
  } = booking;
  const status = useQueryParam("status");
  return (
    <>
      <BookingCard
        img={image_list?.[0]?.img}
        title={prop_title}
        checkIn={check_in}
        checkOut={check_out}
        bookStatus={book_status}
        totalPaid={total_paid}
        path={`/hosting/bookings/${book_id}?status=${status}`}
      >
        {status === "active" && book_status === "Booked" && (
          <div className="flex flex-col sm:items-center sm:flex-row gap-2 sm:gap-5 md:gap-10">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsConfirmBookingOpen(true);
              }}
              className="py-2 w-40 bg-primary text-white rounded"
            >
              {t("confirm_booking")}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsCancelBookingOpen(true);
              }}
              className="py-2 w-40 bg-primary text-white rounded"
            >
              {t("cancel_booking")}
            </Button>
          </div>
        )}
      </BookingCard>
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
