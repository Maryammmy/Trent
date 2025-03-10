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
  video: string;
  images: string[];
  price: string;
  facility: string[];
  beds: string;
  bathroom: string;
  sqft: string;
  ptype: string;
  google_maps_url: string;
  security_deposit: string;
  government: string;
  city_en: string;
  city_ar: string;
  title_en: string;
  title_ar: string;
  compound_name_en: string;
  compound_name_ar: string;
  address_en: string;
  address_ar: string;
  floor_en: string;
  floor_ar: string;
  plimit: string;
  min_days: string;
  max_days: string;
  period: string;
  description_en: string;
  description_ar: string;
  guest_rules_en: string;
  guest_rules_ar: string;
};

export type CurrentLanguage = "en" | "ar";
