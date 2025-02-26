import image1 from "../assets/iamges/home1.avif";
import image2 from "../assets/iamges/home2.avif";
import image3 from "../assets/iamges/home3.webp";
import image4 from "../assets/iamges/home4.avif";
import googleIcon from "../assets/iamges/google.png";
import appleIcon from "../assets/iamges/apple.png";
import faceIcon from "../assets/iamges/facebook.png";
import { IButton, ISelectOption } from "../interfaces";
import { Mail } from "lucide-react";
import { INavItem } from "../interfaces/landingInterface";

export const images: string[] = [image1, image2, image3, image4];
export const languageOptions: ISelectOption[] = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];
export const buttons: IButton[] = [
  { id: 1, label: "Continue with Google", icon: googleIcon },
  { id: 2, label: "Continue with Apple", icon: appleIcon },
  {
    id: 3,
    label: "Continue with Email",
    icon: <Mail size={30} />,
  },
  { id: 4, label: "Continue with Facebook", icon: faceIcon },
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
