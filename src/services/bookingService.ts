import { useQuery } from "@tanstack/react-query";
import { baseAPI, baseAPIForm } from ".";
import {
  ICancelBooking,
  ICancelNonCompletedBooking,
  ICheckInOut,
  ICompletePayment,
  IConfirmBooking,
  ISaveBooking,
  IVerifyPay,
  IVerifyProperty,
} from "@/interfaces/booking";
import { currentLanguage, uid } from "@/constants";
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
export const verifyPropertyAPI = async (payload: IVerifyProperty) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/booking/u_verify_property_rules.php",
    formData
  );
  return response;
};
export const saveBookingAPI = async (payload: ISaveBooking) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
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
export const cancelBookingAPI = async (payload: ICancelBooking) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/booking/u_book_cancle.php",
    formData
  );
  return response;
};
export const paymentStatusAPI = (
  merchantRefNumber: string,
  itemId: string,
  finalTotal: string
) => {
  const response = baseAPI.get(
    `user_api/booking/get_payment_status.php?merchant_ref_number=${merchantRefNumber}&item_id=${itemId}&final_total=${finalTotal}`
  );
  return response;
};
export const confirmBookingAPI = async (payload: IConfirmBooking) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/booking/u_confirm_booking.php",
    formData
  );
  return response;
};
export const checkInOutAPI = async (payload: ICheckInOut) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    `user_api/booking/u_check_in_out.php`,
    formData
  );
  return response;
};
export const checkCouponAPI = async (
  couponCode: string,
  itemId: string,
  total: string
) => {
  const response = await baseAPI.get(
    `user_api/booking/u_check_coupon.php?coupon_code=${couponCode}&uid=${uid}&item_id=${itemId}&total=${total}`
  );
  return response;
};
export const removeCouponAPI = async (itemId: string) => {
  const response = await baseAPI.get(
    `user_api/booking/remove_coupon.php?uid=${uid}&item_id=${itemId}`
  );
  return response;
};
export const completePaymentAPI = async (payload: ICompletePayment) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/booking/u_complete_paying.php",
    formData
  );
  return response;
};
export const verifyPayAPI = async (payload: IVerifyPay) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/booking/verify_pay.php",
    formData
  );
  return response;
};
export const nonCompletedBookingAPI = async () => {
  const response = await baseAPI.get(
    `user_api/booking/u_non_completed_booking.php?uid=${uid}&lang=${currentLanguage}`
  );
  return response;
};
export const useNonCompletedBookingAPI = () => {
  return useQuery({
    queryKey: ["nonCompletedBooking"],
    queryFn: () =>
      baseAPI.get(
        `user_api/booking/u_non_completed_booking.php?uid=${uid}&lang=${currentLanguage}`
      ),
  });
};
export const cancelNonCompletedBookingAPI = async (
  payload: ICancelNonCompletedBooking
) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  const response = await baseAPIForm.post(
    "user_api/booking/u_cancel_non_completed.php",
    formData
  );
  return response;
};
