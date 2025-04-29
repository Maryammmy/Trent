import { IImage } from "./property/property";

export interface IVerifyProperty {
  prop_id: string;
  from_date: string;
  to_date: string;
  confirm_guest_rules: boolean;
  guest_counts: number;
  uid: string;
  lang: string;
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
}
export interface IPaymentMethodBook {
  label: string;
  value: string;
  icons: string[];
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
}
