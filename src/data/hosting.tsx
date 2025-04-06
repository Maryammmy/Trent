import { IHosting } from "@/interfaces/hosting";
import {
  Home,
  Calendar,
  MessageCircle,
  DollarSign,
  CreditCard,
  Image,
  Star,
} from "lucide-react";

export const hosting: IHosting[] = [
  {
    label: "my_properties",
    to: "/hosting/properties",
    icon: <Home size={40} />,
    count: 4,
  },
  {
    label: "my_bookings",
    to: "/hosting/bookings",
    icon: <Calendar size={40} />,
    count: 0,
  },
  {
    label: "my_enquiries",
    to: "/hosting/enquiries",
    icon: <MessageCircle size={40} />,
    count: 0,
  },
  {
    label: "my_earnings",
    to: "/hosting/earnings",
    icon: <DollarSign size={40} />,
    count: 0,
  },
  {
    label: "my_payouts",
    to: "/hosting/payouts",
    icon: <CreditCard size={40} />,
    count: 0,
  },
  {
    label: "my_extra_images",
    to: "/hosting/extra-images",
    icon: <Image size={40} />,
    count: 0,
  },
  {
    label: "total_reviews",
    to: "/hosting/reviews",
    icon: <Star size={40} />,
    count: 0,
  },
];
