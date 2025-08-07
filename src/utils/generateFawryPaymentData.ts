import { FawryPaymentArgs } from "@/interfaces/fawry";
import {
  currentLanguage,
  fawryPrivateKey,
  paymentExpiry,
} from "./../constants/index";
import { decryptFawryCredentials } from "./decryptFawryCredentials";
import { merchantRefNum, quantity } from "@/constants";
import { sha256 } from "js-sha256";

export const generateFawryPaymentInitData = ({
  encryptedMerchantCode,
  encryptedSecureKey,
  itemId,
  price,
  paymentMethod,
  returnUrl,
  customerMobile,
  customerEmail,
  customerName,
}: FawryPaymentArgs) => {
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
      },
    ],
    customerMobile,
    customerEmail,
    customerName,
    paymentMethod,
    signature,
    authCaptureModePayment: false,
    paymentExpiry,
    returnUrl,
  };
  return paymentData;
};
export const generateFawryPaymentStatusParam = (
  encryptedMerchantCode: string,
  encryptedSecureKey: string,
  merchantRefNum: string
) => {
  const merchantCode = decryptFawryCredentials(
    encryptedMerchantCode,
    fawryPrivateKey
  );
  const secureKey = decryptFawryCredentials(
    encryptedSecureKey,
    fawryPrivateKey
  );

  const signatureString = merchantCode + merchantRefNum + secureKey;
  const signature = sha256(signatureString);
  const param = {
    merchantCode,
    merchantRefNum,
    signature,
  };
  return { ...param };
};
