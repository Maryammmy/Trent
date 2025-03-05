import { ReactNode } from "react";
export interface IImage {
  img: string;
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
  IS_FAVOURITE: number;
  bathrooms_count: string;
  beds_count: string;
  category_type: string;
  city: string;
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
export interface IAmenity {
  text: string;
  icon: ReactNode;
}
