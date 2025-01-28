import image1 from "../assets/iamges/home1.avif";
import image2 from "../assets/iamges/home2.avif";
import image3 from "../assets/iamges/home3.webp";
import image4 from "../assets/iamges/home4.avif";
import googleIcon from "../assets/iamges/google.png";
import appleIcon from "../assets/iamges/apple.png";
import faceIcon from "../assets/iamges/facebook.png";
import { IButton, IHomeSearch, ISelectOption } from "../interfaces";
import { Mail } from "lucide-react";

export const images: string[] = [image1, image2, image3, image4];
export const languageOptions: ISelectOption[] = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];
export const countryOptions: ISelectOption[] = [
  { value: "eg", label: "Egypt (+20)" },
  { value: "us", label: "USA (+1)" },
  { value: "uk", label: "UK (+44)" },
];
export const buttons: IButton[] = [
  { id: 1, label: "Continue with Google", icon: googleIcon },
  { id: 2, label: "Continue with Apple", icon: appleIcon },
  { id: 3, label: "Continue with Email", icon: <Mail size={30} /> },
  { id: 4, label: "Continue with Facebook", icon: faceIcon },
];
export const menuItems: string[] = [
  "sign_up",
  "log_in",
  "gift_cards",
  "trent_your_home",
  "host_an_experience",
  "help_Center",
];
export const homeSearch: IHomeSearch[] = [
  { title: "where", text: "search_destinations" },
  { title: "check_in", text: "add_dates" },
  { title: "check_out", text: "add_dates" },
  { title: "who", text: "add_guests" },
];
