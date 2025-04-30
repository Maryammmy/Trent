import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { CurrentLanguage } from "@/types";
import { IVerifyProperty } from "@/interfaces/booking";
import Cookies from "js-cookie";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
const uid = Cookies.get("user_id");
export const usePropertyInfoAPI = (id: string | undefined) => {
  return useQuery({
    queryKey: ["propertyInfo", id],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_property_info.php?lang=${currentLanguage}&prop_id=${id}`
      ),
    enabled: !!id,
  });
};
export const verifyPropertyAPI = (payload: IVerifyProperty) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/booking/u_verify_property_rules.php",
    formData
  );
  return response;
};
export const saveBookingAPI = (payload: IVerifyProperty) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/booking/u_save_booking.php",
    formData
  );
  return response;
};
export const useMyBookingsAPI = (status: string) => {
  return useQuery({
    queryKey: ["myBookings", status],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_my_book.php?lang=${currentLanguage}&status=${status}&uid=${uid}`
      ),
    enabled: !!uid && !!status,
  });
};
export const useBookingDetailsAPI = (book_id: string | undefined) => {
  return useQuery({
    queryKey: ["bookingDetails", book_id],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_book_details.php?uid=${uid}&book_id=${book_id}&lang=${currentLanguage}`
      ),
    enabled: !!uid && !!book_id,
  });
};
