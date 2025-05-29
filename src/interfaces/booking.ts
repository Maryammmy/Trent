import { IGovernement } from ".";
import { IImage } from "./property";

export interface IVerifyProperty {
  prop_id: string;
  from_date: string;
  to_date: string;
  confirm_guest_rules: boolean;
  guest_counts: number;
  uid: string;
  lang: string;
}
export interface ISaveBooking {
  prop_id: string;
  from_date: string;
  to_date: string;
  confirm_guest_rules: boolean;
  guest_counts: string;
  uid: string;
  lang: string;
  method_key: string;
  item_id: string;
  merchant_ref_number?: string;
}
export interface IVerifyPropertyResponse {
  IS_FAVOURITE: number;
  deposit_fees: string;
  final_total: number;
  id: string;
  image_list: IImage[];
  period_type: string;
  price: string;
  rate: number;
  service_fees: number;
  sub_total: number;
  taxes: number;
  title: string;
  trent_fees: number;
  days: number;
  from_date: string;
  to_date: string;
  guest_count: string;
  tax_percent: string;
  confirm_guest_rules: boolean;
  item_id: number;
  wallet_balance: string;
  book_id: string;
  book_status: string;
}
export interface ISaveBookingResponse {
  IS_FAVOURITE: number;
  deposit_fees: string;
  final_total: number;
  id: string;
  image_list: IImage[];
  period_type: string;
  price: string;
  rate: number;
  service_fees: number;
  sub_total: number;
  taxes: number;
  title: string;
  trent_fees: number;
  days: number;
  from_date: string;
  to_date: string;
  guest_count: string;
  tax_percent: string;
  confirm_guest_rules: boolean;
  item_id: number;
  wallet_balance: string;
  book_id: string;
  book_status: string;
}
export interface IIndividualRate {
  rate: string;
  comment: string;
  created_at: string;
  id: string;
}
export interface IBooking {
  book_id: string;
  book_status: string;
  p_method_id: string;
  prop_id: string;
  prop_img: string;
  prop_price: string;
  prop_title: string;
  rate: string;
  total_day: string;
  check_in: string;
  check_out: string;
  total_paid: string;
  bathrooms_count: string;
  beds_count: string;
  address: string;
  category: { id: string; type: string };
  city: string;
  government: IGovernement;
  individual_rate: IIndividualRate;
}
export interface IBookingDetails {
  address: string;
  bathrooms_count: string;
  beds_count: string;
  book_date: string;
  book_id: string;
  book_status: string;
  category: { id: string; type: string };
  check_in: string;
  check_intime: string;
  check_out: string;
  check_outtime: string;
  city: string;
  government: IGovernement;
  noguest: string;
  p_method_id: string;
  prop_id: string;
  prop_img_list: IImage[];
  prop_price: string;
  prop_title: string;
  rate: string;
  subtotal: string;
  total: string;
  total_day: string;
}
export interface ICancelBooking {
  lang: string;
  booking_id: string;
  uid: string;
  cancel_id: string;
}
export interface ICancelReason {
  id: string;
  reason: string;
}
export interface IConfirmBooking {
  lang: string;
  booking_id: string;
  deny_id?: string;
  is_confirmed: boolean;
}
export interface ICheckInOut {
  lang: string;
  uid: string;
  booking_id: string;
  is_check_in: boolean;
}
