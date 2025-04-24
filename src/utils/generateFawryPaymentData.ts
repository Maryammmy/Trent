import { merchantRefNum, quantity } from "@/constants";
import { CurrentLanguage } from "@/types";
import { sha256 } from "js-sha256";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;

export const generateFawryPaymentData = (
  itemId: string,
  propPrice: number,
  paymentMethod: string,
  imageUrl: string,
  returnUrl: string
) => {
  const price = Math.round(propPrice);
  const signatureString =
    "770000019834" +
    merchantRefNum +
    returnUrl +
    itemId +
    quantity +
    price.toFixed(2) +
    "6c65ee7b-9a31-49fb-9630-ca5546f6037a";
  const signature = sha256(signatureString);
  const paymentData = {
    merchantCode: "770000019834",
    merchantRefNum,
    language: currentLanguage === "ar" ? "ar-eg" : "en-gb",
    chargeItems: [
      {
        itemId,
        price,
        quantity,
        imageUrl,
      },
    ],
    paymentMethod,
    signature,
    authCaptureModePayment: false,
    returnUrl,
  };
  return paymentData;
};
