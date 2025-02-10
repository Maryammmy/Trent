import { IFooterLinks } from "../interfaces";
import faceIcon from "../assets/iamges/faceFooter.svg";
import instaIcon from "../assets/iamges/instaFooter.svg";
import twitterIcon from "../assets/iamges/twitterFooter.svg";

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
export const icons: string[] = [faceIcon, instaIcon, twitterIcon];
