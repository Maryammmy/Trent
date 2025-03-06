import { ReactNode } from "react";

export interface IHomeDataParams {
  category_id?: string;
  uid?: string;
  only_featured?: boolean;
  period?: string;
  min_price?: string;
  max_price?: string;
  government_id?: string;
  facilities?: number[];
  beds_count?: number;
  bathrooms_count?: number;
  guest_count?: number;
  rate?: number;
}
export interface IWhyChooseUs {
  why_choose_us_description: string;
  why_choose_us_title: string;
  why_choose_us_img: string;
  why_choose_us_bg: string;
}
export interface IChooseUs {
  title: string;
  icon: string | ReactNode;
}
export interface IFilterButton {
  text: string;
  className: string;
}
export interface INavItem {
  label: string;
  to: string;
}
export interface IFilterProps {
  uid?: number;
  government_id?: number;
  facilities_ids?: string[];
  prop_type_id?: number;
  min_price?: number;
  max_price?: number;
  beds?: number;
  bathrooms?: number;
}
