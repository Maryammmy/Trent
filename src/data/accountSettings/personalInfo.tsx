import { LockKeyhole, Shield } from "lucide-react";
import { IPersonalCard } from "../../interfaces/accountSettings";
import { ISelectOption } from "../../interfaces";
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
export const gender: ISelectOption[] = [
  { label: "male", value: "m" },
  { label: "female", value: "f" },
];
