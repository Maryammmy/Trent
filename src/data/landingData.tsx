import priceLogo from "../assets/iamges/wallet-money.svg";
import percentageLogo from "../assets/iamges/discount-shape.svg";
import pyramidsLogo from "../assets/iamges/pyramids.svg";
import { HandCoins } from "lucide-react";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IChooseUs, IFilterButton } from "../interfaces/landingInterface";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IDestinations, IHomeSearch, ResponsiveSetting } from "../interfaces";

export const getResponsiveSettings = (
  sliderLength: number
): ResponsiveSetting[] => [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: Math.min(sliderLength, 3),
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: Math.min(sliderLength, 2),
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: Math.min(sliderLength, 1),
    },
  },
];
export const responsiveSettings = [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
];
export const chooseUs: IChooseUs[] = [
  {
    icon: priceLogo,
    title: "Best Price for rent",
  },
  {
    icon: percentageLogo,
    title: "Lowest percentage of owners",
  },
  {
    icon: pyramidsLogo,
    title: "Egyptian Organization",
  },
  {
    icon: <HandCoins size={40} className="text-white" />,
    title: "Secured Payments",
  },
  {
    icon: <RiCustomerServiceFill size={40} className="text-white" />,
    title: "Customer Service 24/7",
  },
];
export const buttonData = [
  {
    platform: "android",
    label: "Google Play",
    icon: <FaGooglePlay size={38} />,
  },
  {
    platform: "ios",
    label: "App Store",
    icon: <FaApple size={45} />,
  },
];
export const filterButtons: IFilterButton[] = [
  {
    text: "clear",
    className: "hover:bg-gray-100",
  },
  {
    text: "apply",
    className: "bg-primary text-white",
  },
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
