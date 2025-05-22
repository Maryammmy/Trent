import { User, Lock, Tickets } from "lucide-react";
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
    to: "/account-settings/credits",
    icon: <Lock size={40} />,
    title: "trent_credits",
    description: "trent_credits_desc",
  },
];
