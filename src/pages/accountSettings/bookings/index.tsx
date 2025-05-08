import Booking from "@/components/accountSettings/bookings/Booking";
import DynamicTitle from "@/components/accountSettings/DynamicTitle";
import PropertyHostingSkeleton from "@/components/skeleton/PropertyHostingSkeleton";
import Button from "@/components/ui/Button";
import { IBooking } from "@/interfaces/booking";
import { useMyBookingsAPI } from "@/services/bookingService";
import { useQueryParam } from "@/utils/getQueryParam";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const { t } = useTranslation();
  const statusFromUrl = useQueryParam("status");
  const status = statusFromUrl || "active";
  const { data } = useMyBookingsAPI(status);
  const bookings: IBooking[] = data?.data?.data?.My_Booking;
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto py-5 md:py-10 px-5 xl:px-0">
      <DynamicTitle title="my_bookings" />
      <div className="flex gap-10 sm:gap-20 text-xl my-8 font-semibold">
        <Button
          onClick={() => navigate("/account-settings/bookings?status=active")}
          className={`text-start text-dark activeButton w-fit ${
            status === "active" ? "active" : ""
          }`}
        >
          {t("active")}
        </Button>
        <Button
          onClick={() =>
            navigate("/account-settings/bookings?status=completed")
          }
          className={`text-start text-dark activeButton w-fit ${
            status === "completed" ? "active" : ""
          }`}
        >
          {t("completed")}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:gap-8 mt-5">
        {!bookings ? (
          <PropertyHostingSkeleton cards={3} />
        ) : bookings?.length ? (
          bookings.map((booking) => (
            <Booking key={booking?.book_id} booking={booking} />
          ))
        ) : (
          <div className="flex justify-center items-center text-lg h-[50vh] text-dark font-medium w-full">
            {t("no_bookings_found")}
          </div>
        )}
      </div>
    </div>
  );
}
export default Bookings;
