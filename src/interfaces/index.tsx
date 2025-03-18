import { ReactNode } from "react";
import { Person } from "../types";
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
export interface IChat {
  id: number;
  name: string;
  message: string;
  unread: number;
}
interface IPerson {
  sender: string;
  receiver: string;
}
export interface IMessage extends Partial<IPerson> {
  text: string;
  time: string;
}
