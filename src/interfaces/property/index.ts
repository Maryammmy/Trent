import { ReactNode } from "react";
export interface ISingleProperty {
  property_details: IDetailsProperty;
  facility_list: IFacilityProperty[];
}
export interface IDetailsProperty {
  cancellation_policy: {
    id: string;
    is_recommended: boolean;
    title: {
      ar: string;
      en: string;
    };
    description: {
      ar: string;
      en: string;
    };
  };
  address: {
    en: string;
    ar: string;
  };
  city: {
    en: string;
    ar: string;
  };
  compound: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  floor: {
    en: string;
    ar: string;
  };
  government: {
    id: string;
    name: {
      en: string;
      ar: string;
    };
  };
  period: {
    id: string;
    name: {
      en: string;
      ar: string;
    };
  };
  owner: {
    img: string;
    name: string;
  };
  guest_rules: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  category: {
    id: string;
    type: {
      en: string;
      ar: string;
    };
  };
  owner_id: string;
  IS_FAVOURITE: number;
  guest_count: string;
  bathrooms_count: string;
  beds_count: string;
  buyorrent: string;
  id: string;
  image_list: IImage[];
  is_enquiry: number;
  latitude: string;
  longitude: string;
  maps_url: string;
  max_days: string;
  min_days: string;
  price: string;
  rate: string;
  security_deposit: string;
  sqrft: string;
  user_id: string;
  video: string;
}
export interface IFacilityProperty {
  id: string;
  img: string;
  title: {
    en: string;
    ar: string;
  };
}
export interface IImage {
  img: string;
  is_panorama: number;
}
export interface IPropertyData {
  uid: string;
  images: File[];
  video?: File;
  price: number;
  facilities: string;
  beds_count: number;
  sqft: number;
  bathrooms_count: number;
  category_id: string;
  guest_count: number;
  min_days: number;
  max_days: number;
  government_id: string;
  security_deposit: number;
  maps_url: string;
  guest_rules_ar: string;
  guest_rules_en: string;
  floor_ar: string;
  floor_en: string;
  title_ar: string;
  title_en: string;
  address_ar: string;
  address_en: string;
  description_ar: string;
  description_en: string;
  city_ar: string;
  city_en: string;
  compound_ar?: string;
  compound_en?: string;
  period: string;
  is_featured?: boolean;
  cancellation_policy_id: string;
}
export interface IProperty {
  IS_FAVOURITE: number;
  bathrooms_count: string;
  beds_count: string;
  category_type: string;
  city_name: string;
  compound_name: string;
  government_name: string;
  guest_count: string;
  id: string;
  image_list: IImage[];
  maps_url: string;
  period_name: string;
  price: string;
  rate: string;
  sqrft: string;
  title: string;
  latitude: string;
  longitude: string;
  is_deleted: boolean;
  is_approved: boolean;
  owner_id: string;
}
export interface IReviewInstruction {
  icon: ReactNode;
  title: string;
  rate: string;
}
export interface IWidth {
  num: number;
  width: string;
}
export interface IToggleProperty {
  uid: string;
  prop_id: string;
}
export interface ICancellationPolicy {
  description: string;
  id: string;
  is_recommended: boolean;
  title: string;
}
