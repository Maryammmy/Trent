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
  signature: string;
  returnUrl: string;
}
