interface IChargeItem {
  itemId: string;
  price: number;
  quantity: number;
}
export interface IInitFawry {
  merchantCode: string;
  merchantRefNum: string;
  language: string;
  chargeItems: IChargeItem[];
  paymentMethod: string;
  signature: string;
  returnUrl: string;
}
