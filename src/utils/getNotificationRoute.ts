export const getNotificationRoute = (
  key: string,
  value: string | number,
  book_status: string,
  is_owner: boolean
): string | null => {
  if (key === "property_id") {
    return "/hosting/properties";
  }

  if (key === "booking_id") {
    const activeStatuses = ["Booked", "Check_in", "Confirmed"];
    const completedStatuses = ["Cancelled", "Completed"];

    if (is_owner) {
      if (activeStatuses.includes(book_status)) {
        return `/hosting/bookings/${value}?status=active`;
      } else if (completedStatuses.includes(book_status)) {
        return `/hosting/bookings/${value}?status=completed`;
      }
    } else {
      if (activeStatuses.includes(book_status)) {
        return `/account-settings/bookings/${value}?status=active`;
      } else if (completedStatuses.includes(book_status)) {
        return `/account-settings/bookings/${value}?status=completed`;
      }
    }
  }

  return null;
};
