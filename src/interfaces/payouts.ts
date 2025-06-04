import { IImage } from "./property";

export interface ICashMethod {
  name: string;
  key: string;
}
export interface ICreatePayoutsProfile {
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
export interface ICreatePayoutsRequest {
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
export interface IPayoutHistory {
  id: string;
  payout_status: string;
  requested_at: string;
  cancel_reason: string;
  total: string;
  prop_title: string;
  prop_img: string;
}
export interface IPayoutEarning {
  total_pending: string;
  total_completed: string;
}
