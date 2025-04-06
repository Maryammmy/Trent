import { ReactNode } from "react";

export interface IFormContact {
  name: string;
  label: string;
  placeholder: string;
}
export interface IContactInfo {
  title: string;
  text: string;
  icon: ReactNode;
}
