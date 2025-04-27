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
      return "/hosting/payouts/profile";
    case "my booking":
    case "حجوزاتي":
      return "/booking";
    case "my gallery images":
    case "صور المعرض":
      return "/gallery/images";
    case "my extra images":
    case "الصور الإضافية":
      return "/gallery/extra-images";
    default:
      return "/";
  }
};
