import {
  User,
  Lock,
  CreditCard,
  FileText,
  Bell,
  Eye,
  Globe,
  Briefcase,
  Gift,
  BetweenVerticalStart,
} from "lucide-react";
import { IAccountSettings } from "../../interfaces/accountSettingsInterface";

export const accountSettingsData: IAccountSettings[] = [
  {
    to: "/account-settings/personal-info",
    icon: <User size={40} />,
    title: "Personal info",
    description: "Provide personal details and how we can reach you",
  },
  {
    to: "/account-settings/login-and-security",
    icon: <Lock size={40} />,
    title: "Login & security",
    description: "Update your password and secure your account",
  },
  {
    to: "/account-settings",
    icon: <CreditCard size={40} />,
    title: "Payments & payouts",
    description: "Review payments, payouts, coupons, and gift cards",
  },
  {
    to: "/account-settings",
    icon: <FileText size={40} />,
    title: "Taxes",
    description: "Manage taxpayer information and tax documents",
  },
  {
    to: "/account-settings",
    icon: <Bell size={40} />,
    title: "Notifications",
    description:
      "Choose notification preferences and how you want to be contacted",
  },
  {
    to: "/account-settings",
    icon: <Eye size={40} />,
    title: "Privacy & sharing",
    description:
      "Manage your personal data, connected services, and data sharing settings",
  },
  {
    to: "/account-settings/preferences",
    icon: <Globe size={40} />,
    title: "Global preferences",
    description: "Set your default language, currency, and timezone",
  },
  {
    to: "/account-settings",
    icon: <Briefcase size={40} />,
    title: "Travel for work",
    description: "Add a work email for business trip benefits",
  },
  {
    to: "/account-settings",
    icon: <Gift size={40} />,
    title: "Referral credit & coupon",
    description: "You have €0 referral credits and coupon",
  },
  {
    to: "/account-settings",
    icon: <BetweenVerticalStart size={40} />,
    title: "Professional hosting tools",
    description:
      "Get professional tools if you manage several properties on Airbnb",
  },
];
