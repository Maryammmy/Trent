import { IFooterLinks } from "../interfaces";
import icon1 from "../assets/iamges/facebook.png";
import icon2 from "../assets/iamges/insta.jpg";
import icon3 from "../assets/iamges/twitter.png";

export const titles: string[] = ["support", "hosting", "Trent"];
export const support: string[] = [
  "help_center",
  "AirCover",
  "anti_discrimination",
  "disability_support",
  "cancellation_options",
  "report_neighborhood_concern",
];
export const hosting: string[] = [
  "trent_your_home",
  "airCover_for_hosts",
  "hosting_resources",
  "community_forum",
  "hosting_responsibly",
  "Trent_friendly_apartments",
  "join_a_free_hosting_class",
  "find_a_co_host",
];
export const Trent: IFooterLinks[] = [
  { title: "Contact Us", to: "/contact-us" },
  { title: "About Us", to: "/about-us" },
];
export const icons: string[] = [icon1, icon2, icon3];
