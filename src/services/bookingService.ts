import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import { CurrentLanguage } from "@/types";
import {
  ICancelBooking,
  IConfirmBooking,
  ISaveBooking,
  IVerifyProperty,
} from "@/interfaces/booking";
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
export const usePropertyDatesAPI = (id: string | undefined) => {
  return useQuery({
    queryKey: ["propertyDates", id],
    queryFn: () => baseAPI.get(`user_api/booking/u_calendar.php?prop_id=${id}`),
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
export const saveBookingAPI = (payload: ISaveBooking) => {
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
export const useMyBookingsAPI = (status: string, isOwner?: boolean) => {
  return useQuery({
    queryKey: ["myBookings", status, isOwner],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_my_book.php?lang=${currentLanguage}&status=${status}&uid=${uid}${
          isOwner ? `&is_owner=${isOwner}` : ""
        }`
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
export const useCancelBookingAPI = () => {
  return useQuery({
    queryKey: ["cancelBooking"],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/user_book_cancel_reason.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
  });
};
export const useOwnerCancelBookingAPI = () => {
  return useQuery({
    queryKey: ["ownerCancelBooking"],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_book_cancel_reason.php?uid=${uid}&lang=${currentLanguage}`
      ),
    enabled: !!uid,
  });
};
export const cancelBookingAPI = (payload: ICancelBooking) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/booking/u_book_cancle.php",
    formData
  );
  return response;
};
export const paymentStatusAPI = (
  merchantRefNumber: string | null,
  itemId: string,
  finalTotal: string
) => {
  const response = baseAPI.get(
    `user_api/booking/get_payment_status.php?merchant_ref_number=${merchantRefNumber}&item_id=${itemId}&final_total=${finalTotal}`
  );
  return response;
};
export const confirmBookingAPI = (payload: IConfirmBooking) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = baseAPIForm.post(
    "user_api/booking/u_confirm_booking.php",
    formData
  );
  return response;
};
