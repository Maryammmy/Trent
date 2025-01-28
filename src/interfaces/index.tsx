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
export interface SpecificCategory {
  title: string;
  item: string;
}
export interface IFooterLinks {
  title: string;
  to: string;
}
export interface IHomeSearch {
  title: string;
  text: string;
}
export interface IDestinations {
  city: string;
  reason: string;
}
