import { ReactNode } from "react";
export interface ApiError {
  response?: {
    data: {
      response_message: string;
    };
  };
}
export interface IPeriod {
  id: string;
  name: string;
}
export interface ICompound {
  id: string;
  name: string;
}
export interface IPropertyType {
  id: string;
  title: string;
  img: string;
}
export interface IFacility {
  id: string;
  title: string;
  img: string;
}
export interface IGovernement {
  id: string;
  name: string;
}
export interface ISelectOption {
  value: string;
  label: string;
}
export interface ResponsiveSetting {
  breakpoint: number;
  settings: {
    slidesToShow: number;
  };
}
export interface IHomeSearch {
  title: string;
  text: string;
}
export interface IDestinations {
  city: string;
  reason: string;
}
export interface IFooterSection {
  title: string;
  items: ReactNode[];
}
