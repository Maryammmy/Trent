import { LockKeyhole, Shield } from "lucide-react";
import {
  ISpecificAccountSettings,
  IPersonalCard,
} from "../../interfaces/accountSettingsInterface";

export const personalInfoData: ISpecificAccountSettings[] = [
  {
    label: "legal_name",
    text: "John Doe",
    button: "edit",
  },
  {
    label: "email",
    text: "John Doe@gmail.com",
    button: "edit",
  },
  {
    label: "phone_number",
    text: "+20****4467",
    button: "edit",
  },
  {
    label: "government_ID",
    text: "Not provided",
    button: "add",
  },
];

export const personalInfoCard: IPersonalCard[] = [
  {
    title: "personal_info_card_title_1",
    text: "personal_info_card_text_1",
    icon: <Shield className="text-primary" size={40} />,
  },
  {
    title: "personal_info_card_title_2",
    text: "personal_info_card_text_2",
    icon: <LockKeyhole className="text-primary" size={40} />,
  },
];
