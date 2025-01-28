import { Eye, LockKeyhole, Shield } from "lucide-react";
import {
  ISpecificAccountSettings,
  IPersonalCard,
} from "../../interfaces/accountSettingsInterface";

export const personalInfoData: ISpecificAccountSettings[] = [
  {
    label: "Legal name",
    text: "John Doe",
    button: "Edit",
  },
  {
    label: "Email",
    text: "John Doe@gmail.com",
    button: "Edit",
  },
  {
    label: "Phone Number",
    text: "+20****4467",
    button: "Edit",
  },
  {
    label: "Government ID",
    text: "Not provided",
    button: "Add",
  },
];

export const personalInfoCard: IPersonalCard[] = [
  {
    title: "Why isn’t my info shown here?",
    text: "We’re hiding some account details to protect your identity.",
    icon: <Shield className="text-primary" size={40} />,
  },
  {
    title: "Which details can be edited?",
    text: "Contact info and personal details can be edited. If this info was used to verify your identity.",
    icon: <LockKeyhole className="text-primary" size={40} />,
  },
  {
    title: "Why isn’t my info shown here?",
    text: "We’re hiding some account details to protect your identity.",
    icon: <Eye className="text-primary" size={40} />,
  },
];
