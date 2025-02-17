import { ReactNode } from "react";

export interface ISelectOption {
  value: string;
  label: string;
}
export interface IButton {
  id: number;
  label: string;
  icon: string | ReactNode;
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
export interface IFilterPropertyType {
  name: string;
  icon: ReactNode;
}
export interface IFooterSection {
  title: string;
  items: ReactNode[];
}
