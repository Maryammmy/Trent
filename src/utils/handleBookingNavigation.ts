import { NavigateFunction } from "react-router-dom";
import { t } from "i18next";
import { uid } from "@/constants";
import toast from "react-hot-toast";

interface HandleBookingNavigationParams {
  e: React.MouseEvent<HTMLButtonElement>;
  owner_id: string;
  id: string | undefined;
  navigate: NavigateFunction;
}

export function handleBookingNavigation({
  e,
  owner_id,
  id,
  navigate,
}: HandleBookingNavigationParams): void {
  e.preventDefault();
  if (uid === owner_id) {
    toast.error(t("you_can't_book_your_own_property"));
    return;
  }
  navigate(`/properties/${id}/book`);
}
