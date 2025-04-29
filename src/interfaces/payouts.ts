import { IImage } from "./property";

export interface ICreatePayoutProfile {
  uid: string;
  method_id: string;
  bank_account_number?: string;
  bank_name?: string;
  wallet_number?: string;
  full_name?: string;
  profile_name: string;
  lang: string;
}
export interface IPaymentMethod {
  id: string;
  name: string;
}
export interface ICreatePayoutRequest {
  uid: string;
  lang: string;
  booking_list: string;
  profile_id: string;
}
export interface IDeletePayoutProfile {
  uid: string;
  profile_id: string;
}
export interface IReadyPayoutProperties {
  id: string;
  title: string;
  check_in: string;
  check_out: string;
  total: string;
  image: IImage[];
}
export interface IPayoutProfile {
  bank_account_number: string;
  bank_name: string;
  id: string;
  method_name: string;
  profile_name: string;
  wallet_number: string;
}
