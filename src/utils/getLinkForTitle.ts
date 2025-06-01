export const getLinkForTitle = (title: string) => {
  switch (title.toLowerCase()) {
    case "my property":
    case "عقاري":
      return "/hosting/properties";
    case "my payout":
    case "مدفوعاتي":
      return "/hosting/payouts";
    case "my payout profiles":
    case "ملفاتي المالية":
      return "/hosting/payouts/profiles";
    case "my booking":
    case "حجوزاتي":
      return "/hosting/bookings?status=active";
    default:
      return "/";
  }
};
