import { ReactNode } from "react";

export interface IPropertyhosting {
  label: string;
  icon: ReactNode;
}
export interface ITypeOfPlace {
  title: string;
  desc: string;
  icon: ReactNode;
}
export interface IGetStartedToHost {
  title: string;
  desc: string;
}
export interface IInstantBook {
  title: string;
  text?: string;
  desc: string;
  icon: ReactNode;
}
export interface IPriceBreakdown {
  label: string;
  value: number;
}
