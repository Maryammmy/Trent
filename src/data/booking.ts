import { IPaymentMethodBook } from "@/interfaces/booking";

export const paymentMethods: IPaymentMethodBook[] = [
  {
    label: "wallet",
    value: "MWALLET",
    icons: [
      "/images/vodafone.png",
      "/images/orange.png",
      "/images/we.png",
      "/images/etis.png",
    ],
  },
  {
    label: "card",
    value: "CARD",
    icons: ["/images/masterCard.png", "/images/visa.png"],
  },
  {
    label: "fawry_pay",
    value: "PayAtFawry",
    icons: ["/images/fawryPay.png"],
  },
  {
    label: "trent_credits",
    value: "trentCredits",
    icons: ["/images/Trent-logo-pdf.png"],
  },
];
