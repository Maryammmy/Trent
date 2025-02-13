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
export interface INavSection {
  id: string;
  items: INavItem[];
}
