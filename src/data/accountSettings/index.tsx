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
  Tickets,
} from "lucide-react";
import { IAccountSettings } from "../../interfaces/accountSettings";

export const accountSettingsData: IAccountSettings[] = [
  {
    to: "/account-settings/personal-info",
    icon: <User size={40} />,
    title: "personal_info",
    description: "personal_info_desc",
  },
  {
    to: "/account-settings/bookings?status=active",
    icon: <Tickets size={40} />,
    title: "my_bookings",
    description: "desc_my_bookings",
  },
  {
    to: "/account-settings/login-and-security",
    icon: <Lock size={40} />,
    title: "login_and_security",
    description: "login_and_security_desc",
  },
  {
    to: "/account-settings",
    icon: <CreditCard size={40} />,
    title: "payments_and_payouts",
    description: "payments_and_payouts_desc",
  },
  {
    to: "/account-settings",
    icon: <FileText size={40} />,
    title: "taxes",
    description: "taxes_desc",
  },
  {
    to: "/account-settings",
    icon: <Bell size={40} />,
    title: "notifications",
    description: "notifications_desc",
  },
  {
    to: "/account-settings",
    icon: <Eye size={40} />,
    title: "privacy_and_sharing",
    description: "privacy_and_sharing_desc",
  },
  {
    to: "/account-settings/preferences",
    icon: <Globe size={40} />,
    title: "global_preferences",
    description: "global_preferences_desc",
  },
  {
    to: "/account-settings",
    icon: <Briefcase size={40} />,
    title: "travel_for_work",
    description: "travel_for_work_desc",
  },
  {
    to: "/account-settings",
    icon: <Gift size={40} />,
    title: "referral_credit_and_coupon",
    description: "referral_credit_and_coupon_desc",
  },
];
