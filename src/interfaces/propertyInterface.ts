import { ReactNode } from "react";
export interface IImage {
  image: string;
  is_panorama: number;
}
export interface IPropertyData {
  uid: string;
  images: string[];
  video: string;
  price: number;
  facility: string[];
  beds: number;
  sqft: number;
  bathroom: number;
  ptype: string;
  plimit: number;
  min_days: number;
  max_days: number;
  government: string;
  security_deposit: number;
  google_maps_url: string;
  guest_rules: {
    ar: string;
    en: string;
  };
  floor: {
    ar: string;
    en: string;
  };
  title: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  city: {
    ar: string;
    en: string;
  };
  compound_name: {
    ar: string;
    en: string;
  };
}
export interface IProperty {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  address: {
    en: string;
    ar: string;
  };
  bathroom: string;
  beds: string;
  buyorrent: string;
  city: {
    en: string;
    ar: string;
  };
  compound_name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  facility_select: string[];
  floor: {
    en: string;
    ar: string;
  };
  google_maps_url: string;
  guest_rules: {
    en: string;
    ar: string;
  };
  image: IImage[];
  is_sell: string;
  max_days: string;
  min_days: string;
  plimit: string;
  price: string;
  property_title: {
    en: string;
    ar: string;
  };
  property_type_id: string;
  rate: number | null;
  security_deposit: string;
  sqrft: string;
  status: string;
  user_id: string;
  video: string;
}
export interface IGallery {
  id: string;
  title: string;
  image: string;
}
export interface ISpecificGallery {
  id: string;
  title: string;
  description: string;
  images: string[];
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
export interface IReview {
  image: string;
  name: string;
  rating: number;
  duration: string;
  when: string;
  text: string;
}
