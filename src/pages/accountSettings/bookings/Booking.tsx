import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useBookingDetailsAPI } from "@/services/bookingService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import {
  Bath,
  BedDouble,
  Calendar,
  MapPin,
  Tickets,
  UsersRound,
} from "lucide-react";
import { GiMoneyStack } from "react-icons/gi";
import { IBookingDetails } from "@/interfaces/booking";
import BookingSkeleton from "@/components/skeleton/BookingSkeleton";

function Booking() {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { data } = useBookingDetailsAPI(id);
  const booking: IBookingDetails = data?.data?.data?.Booking_details;

  const handlePrint = async () => {
    const input = printRef.current;
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("booking-details.pdf");
    }
  };
  return (
    <>
      {!booking ? (
        <BookingSkeleton cards={6} />
      ) : (
        <div className="max-w-6xl mx-auto pb-5 md:pb-10 px-5 xl:px-0">
          <div ref={printRef} className="py-5 md:py-10">
            <div className="pb-5">
              <h2 className="text-2xl font-bold pb-1">{booking?.prop_title}</h2>
              <div className="flex items-center font-semibold text-lg">
                <p>{booking?.city}</p>,<p>{booking?.government?.name}</p>
              </div>
            </div>
            <div>
              <div className="space-y-2 font-medium md:text-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary shrink-0" />
                      <span>{t("check_in")} :</span>
                    </div>
                    <span>{booking?.check_in}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary shrink-0" />
                      <span>{t("check_out")} :</span>
                    </div>
                    <span>{booking?.check_out}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary shrink-0" />
                      <span>{t("booking_date")} :</span>
                    </div>
                    <span>{booking?.book_date}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Tickets className="text-primary shrink-0" />
                      <span>{t("booking_status")} :</span>
                    </div>
                    <span className="text-primary font-semibold">
                      {" "}
                      {booking?.book_status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <UsersRound className="text-primary shrink-0" />
                      <span>{t("guests_count")} :</span>
                    </div>
                    <span> {booking?.noguest}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-primary shrink-0" />
                    <span> {booking?.address}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <BedDouble className="text-primary shrink-0" />
                      <span>{t("beds_count")} :</span>
                    </div>
                    <span> {booking?.beds_count}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Bath className="text-primary shrink-0" />
                      <span>{t("bathrooms_count")} :</span>
                    </div>
                    <span> {booking?.bathrooms_count}</span>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex items-center gap-2 flex-wrap border-t py-4 font-medium text-lg">
                  <div className="flex items-center gap-2">
                    <GiMoneyStack className="text-primary shrink-0" size={30} />
                    <span>{t("price_without_egp")} :</span>
                  </div>
                  <span>{parseInt(booking?.prop_price)}</span>
                  {t("price_per_night")}
                </div>
                <div className="flex items-center gap-2 flex-wrap border-t py-4 text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <GiMoneyStack className="text-primary shrink-0" size={30} />
                    <span>{t("total")} :</span>
                  </div>
                  <span>
                    {parseInt(booking?.total)} {t("price_per_night")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pb-5">
            <Button
              className="bg-primary py-3 px-4 text-white font-medium rounded-md"
              onClick={handlePrint}
            >
              {t("download_PDF")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Booking;
