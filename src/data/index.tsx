import { ISelectOption } from "../interfaces";
import { INavItem } from "../interfaces/landingInterface";

export const periods: ISelectOption[] = [
  { label: "daily", value: "d" },
  { label: "monthly", value: "m" },
];
export const languageOptions: ISelectOption[] = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];
export const navItems: INavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact-us" },
];
export const authItems: string[] = ["log_in", "sign_up"];
export const menuItems: string[] = [
  "gift_cards",
  "trent_your_home",
  "host_an_experience",
  "help_center",
  "log_out",
];
