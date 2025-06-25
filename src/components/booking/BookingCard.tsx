import Image from "@/components/ui/Image";
import { baseURL } from "@/services";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  img: string;
  checkIn: string;
  checkOut: string;
  bookStatus: string;
  totalPaid: string;
  path: string;
  isFullPaid: boolean;
  children: ReactNode;
}

function BookingCard({
  title,
  img,
  checkIn,
  checkOut,
  bookStatus,
  totalPaid,
  path,
  isFullPaid,
  children,
}: Props) {
  const { t } = useTranslation();
  return (
    <Link
      to={path}
      className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border p-4 rounded-2xl font-semibold"
    >
      <div className="flex justify-between items-center">
        <div className="relative h-14 w-14 overflow-hidden rounded-md shrink-0">
          <div className="absolute inset-0 bg-black/15 pointer-events-none z-[5]" />
          <div className="w-full h-full">
            <Image
              imageUrl={baseURL + img}
              alt="property"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg">{title}</h3>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
          <p>
            <span>{t("check_in")}:</span> {checkIn}
          </p>
          <p>
            <span>{t("check_out")}:</span> {checkOut}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div>
            <span>{t("status")}:</span>
            <span className="text-primary"> {bookStatus}</span>
          </div>
          <div>
            <span>{t("payment")}:</span>
            <span className={isFullPaid ? "text-green-600" : "text-primary"}>
              {" "}
              {isFullPaid ? t("paid") : t("partially_paid")}
            </span>
          </div>
        </div>
        <p className="text-lg">
          <span>{t("total")}:</span> {totalPaid} {t("EGP")}
        </p>
        {children && children}
      </div>
    </Link>
  );
}

export default BookingCard;
