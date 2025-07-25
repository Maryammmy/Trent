import { BaseProps } from "@/interfaces";

export type SignupNameInputs = {
  name: string;
  email?: string;
  mobile: string;
  ccode: string;
  password: string;
  confirmPassword: string;
};
export type LoginNameInputs = {
  mobile: string;
  ccode: string;
  password: string;
};
export type PropertyNameInputs = {
  uid: string;
  prop_id: string;
  video?: string | File;
  images?: File[];
  existing_images?: string[];
  price: string;
  facilities: string[];
  beds_count: string;
  bathrooms_count: string;
  sqft: string;
  category_id: string;
  maps_url: string;
  security_deposit: string;
  government_id: string;
  city_en: string;
  city_ar: string;
  title_en: string;
  title_ar: string;
  compound_en?: string;
  compound_ar?: string;
  address_en: string;
  address_ar: string;
  floor_en: string;
  floor_ar: string;
  guest_count: string;
  min_days: string;
  max_days: string;
  period: string;
  description_en: string;
  description_ar: string;
  guest_rules_en: string;
  guest_rules_ar: string;
  cancellation_policy_id: string;
  date_ranges?: [string, string][];
  inc_value_ranges?: RaiseRangeTuple[];
};
export type PropertyInputs = {
  price: string;
  beds_count: string;
  bathrooms_count: string;
  sqft: string;
  maps_url: string;
  security_deposit: string;
  city_en: string;
  city_ar: string;
  title_en: string;
  title_ar: string;
  compound_en?: string;
  compound_ar?: string;
  address_en: string;
  address_ar: string;
  floor_en: string;
  floor_ar: string;
  guest_count: string;
  min_days: string;
  max_days: string;
  period: string;
};
export type PropertyTextArea = {
  description_en: string;
  description_ar: string;
  guest_rules_en: string;
  guest_rules_ar: string;
};
export type CurrentLanguage = "en" | "ar";
export type Person = "sender" | "receiver";
export type ValidationMinMaxDays = "min" | "max";
type EditableCountrySelectorProps = {
  onChange: (value: string) => void;
};
type ReadOnlyCountrySelectorProps = {
  readOnly: true;
};

export type IPropsCountrySelector = BaseProps &
  (ReadOnlyCountrySelectorProps | EditableCountrySelectorProps);

export type RaiseRangeTuple = [string, string, number];
