interface IChargeItem {
  itemId: string;
  price: number;
  quantity: number;
}
export interface IInitFawry {
  merchantCode: string | null;
  merchantRefNum: string;
  language: string;
  chargeItems: IChargeItem[];
  paymentMethod: string;
  authCaptureModePayment: boolean;
  paymentExpiry: number;
  signature: string;
  returnUrl: string;
  customerMobile?: string;
  customerEmail?: string;
  customerName?: string;
}
export interface FawryPaymentArgs {
  encryptedMerchantCode: string;
  encryptedSecureKey: string;
  itemId: string;
  price: number;
  paymentMethod: string;
  returnUrl: string;
  customerMobile?: string;
  customerEmail?: string;
  customerName?: string;
}
