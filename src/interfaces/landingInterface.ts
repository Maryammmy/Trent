import { ReactNode } from "react";

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
export interface ITypeList {
  id: string;
  title: string;
}
export interface IFacilityList {
  id: string;
  title: string;
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
