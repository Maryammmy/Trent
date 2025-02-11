import priceLogo from "../assets/iamges/wallet-money.svg";
import percentageLogo from "../assets/iamges/discount-shape.svg";
import pyramidsLogo from "../assets/iamges/pyramids.svg";
import { HandCoins } from "lucide-react";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IChooseUs } from "../interfaces/landingInterface";
import { FaApple, FaGooglePlay } from "react-icons/fa";

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
