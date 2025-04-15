import { merchantRefNum, quantity, returnUrl } from "@/constants";
import { fawryMerchantCode, fawrySecureKey } from "@/services";
import { CurrentLanguage } from "@/types";
import { sha256 } from "js-sha256";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
export const generateFawryPaymentData = (
  itemId: string,
  propPrice: string,
  paymentMethod: string
) => {
  const price = parseInt(propPrice);
  const signatureString =
    fawryMerchantCode +
    merchantRefNum +
    returnUrl +
    itemId +
    quantity +
    price.toFixed(2) +
    fawrySecureKey;
  const signature = sha256(signatureString);
  const paymentData = {
    merchantCode: fawryMerchantCode,
    merchantRefNum,
    language: currentLanguage === "ar" ? "ar-eg" : "en-gb",
    chargeItems: [
      {
        itemId,
        price,
        quantity,
      },
    ],
    paymentMethod,
    signature,
    returnUrl,
  };
  return paymentData;
};
