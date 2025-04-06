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
export interface IUpdateUser {
  uid: string;
  email?: string;
  full_name: string;
  gender: string;
  pro_img?: string | File;
}

export interface IUser {
  uid: string;
  email?: string;
  full_name: string;
  gender: string;
  pro_img?: string | File;
  phone: string;
  user_fees_percent: string;
  owner_fees_percent: string;
  membership: string;
}
export interface IChangeMobile {
  new_mobile: string;
  old_mobile: string;
}
