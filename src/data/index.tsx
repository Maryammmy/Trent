import image1 from "../assets/iamges/home1.avif";
import image2 from "../assets/iamges/home2.avif";
import image3 from "../assets/iamges/home3.webp";
import image4 from "../assets/iamges/home4.avif";
import googleIcon from "../assets/iamges/google.png";
import appleIcon from "../assets/iamges/apple.png";
import faceIcon from "../assets/iamges/facebook.png";
import {
  IButton,
  IDestinations,
  IFilterPropertyType,
  IHomeSearch,
  ISelectOption,
} from "../interfaces";
import { Hotel, House, HousePlus, Mail, School } from "lucide-react";

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
// export const authItems: string[] = ["log_in", "sign_up"];
export const menuItems: string[] = [
  "gift_cards",
  "trent_your_home",
  "host_an_experience",
  "help_center",
  "log_out",
];
export const homeSearch: IHomeSearch[] = [
  { title: "destination", text: "search_destinations" },
  { title: "check_in", text: "add_dates" },
  { title: "check_out", text: "add_dates" },
  { title: "home_search_guests", text: "add_guests" },
];
export const destinations: IDestinations[] = [
  {
    city: "Sofia, Bulgaria",
    reason: "For sights like Alexander Nevsky Cathedral",
  },
  { city: "Tallinn, Estonia", reason: "For its bustling nightlife" },
  { city: "Warsaw, Poland", reason: "For its stunning architecture" },
  { city: "Helsinki, Finland", reason: "For sights like Suomenlinna" },
  { city: "Stockholm, Sweden", reason: "For its top-notch dining" },
  { city: "Riga, Latvia", reason: "For its bustling nightlife" },
  { city: "Tallinn, Estonia", reason: "For its bustling nightlife" },
  { city: "Warsaw, Poland", reason: "For its stunning architecture" },
  { city: "Helsinki, Finland", reason: "For sights like Suomenlinna" },
  { city: "Stockholm, Sweden", reason: "For its top-notch dining" },
  { city: "Riga, Latvia", reason: "For its bustling nightlife" },
];
export const filterTypes: string[] = ["any_type", "room", "entire_home"];
export const filterRoomsAndBeds: string[] = ["bedrooms", "beds", "bathrooms"];
export const filterPropertyType: IFilterPropertyType[] = [
  { name: "House", icon: <House /> },
  { name: "Apartment", icon: <School /> },
  { name: "Guesthouse", icon: <HousePlus /> },
  { name: "Hotel", icon: <Hotel /> },
];
