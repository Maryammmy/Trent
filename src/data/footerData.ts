import { IFooterLinks } from "../interfaces";
import icon1 from "../assets/iamges/facebook.png";
import icon2 from "../assets/iamges/insta.jpg";
import icon3 from "../assets/iamges/twitter.png";

export const titles: string[] = ["Support", "Hosting", "Trent"];
export const support: string[] = [
  "Help Center",
  "AirCover",
  "Anti-discrimination",
  "Disability support",
  "Cancellation options",
  "Report neighborhood concern",
];
export const hosting: string[] = [
  "Trent your home",
  "AirCover for Hosts",
  "Hosting resources",
  "Community forum",
  "Hosting responsibly",
  "Trent-friendly apartments",
  "Join a free Hosting class",
  "Find a co‑host",
];
export const Trent: IFooterLinks[] = [
  { title: "Contact Us", to: "/contact-us" },
  { title: "About Us", to: "/about-us" },
];
export const icons: string[] = [icon1, icon2, icon3];
