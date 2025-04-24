import { fawryPrivateKey } from "./../constants/index";
import { decryptFawryCredentials } from "./decryptFawryCredentials";
import { merchantRefNum, quantity } from "@/constants";
import { CurrentLanguage } from "@/types";
import { sha256 } from "js-sha256";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;

export const generateFawryPaymentData = (
  encryptedMerchantCode: string,
  encryptedSecureKey: string,
  itemId: string,
  propPrice: number,
  paymentMethod: string,
  imageUrl: string,
  returnUrl: string
) => {
  const price = Math.round(propPrice);
  const merchantCode = decryptFawryCredentials(
    encryptedMerchantCode,
    fawryPrivateKey
  );
  const secureKey = decryptFawryCredentials(
    encryptedSecureKey,
    fawryPrivateKey
  );

  const signatureString =
    merchantCode +
    merchantRefNum +
    returnUrl +
    itemId +
    quantity +
    price.toFixed(2) +
    secureKey;
  const signature = sha256(signatureString);
  const paymentData = {
    merchantCode,
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
