import { ISelectOption } from "../interfaces";
import { INavItem } from "../interfaces/landing";

export const periods: ISelectOption[] = [
  { label: "daily", value: "d" },
  { label: "monthly", value: "m" },
];
export const languageOptions: ISelectOption[] = [
  { label: "English", value: "en" },
  { label: "Arabic", value: "ar" },
];
export const navItems: INavItem[] = [{ label: "home", to: "/" }];
export const authItems: string[] = ["log_in", "sign_up"];
export const menuItems: INavItem[] = [
  { label: "host_your_house", to: "/become-a-host" },
  { label: "renter_panel", to: "/hosting" },
  { label: "account", to: "/account-settings" },
  { label: "log_out", to: "#" },
];
export const currencies: string[] = [
  "EGP",
  "USD",
  "SAR",
  "QAR",
  "AED",
  "EUR",
  "IQD",
  "JOD",
  "KWD",
  "OMR",
];
