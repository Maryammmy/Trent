import { ReactNode } from "react";

export interface ISpecificAccountSettings {
  label: string;
  text: string;
  button: string;
}
export interface IPersonalCard {
  title: string;
  text: string;
  icon: ReactNode;
}
export interface IAccountSettings {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
}
