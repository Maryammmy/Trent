export const getNotificationRoute = (
  key: string,
  book_status: string,
  is_owner: boolean
): string | null => {
  if (key === "property_id") {
    return "/hosting/properties";
  }
  if (key === "chat_id") {
    return "/chat";
  }
  if (key === "booking_id") {
    const activeStatuses = ["Booked", "Check_in", "Confirmed"];
    const completedStatuses = ["Cancelled", "Completed"];

    if (is_owner) {
      if (activeStatuses.includes(book_status)) {
        return `/hosting/bookings?status=active`;
      } else if (completedStatuses.includes(book_status)) {
        return `/hosting/bookings?status=completed`;
      }
    } else {
      if (activeStatuses.includes(book_status)) {
        return `/account-settings/bookings?status=active`;
      } else if (completedStatuses.includes(book_status)) {
        return `/account-settings/bookings?status=completed`;
      }
    }
  }

  return null;
};
