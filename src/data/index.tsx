import { IChat, IMessage, ISelectOption } from "../interfaces";
import { INavItem } from "../interfaces/landingInterface";

export const dummyChats: IChat[] = [
  { id: 1, name: "Malak", message: "hello", unread: 1 },
  { id: 2, name: "Maryam", message: "I send you a request", unread: 1 },
  {
    id: 3,
    name: "Omar",
    message: "Yeah omar how are you",
    unread: 1,
  },
  { id: 4, name: "abdelrahman", message: "Sent new media file", unread: 1 },
];

export const dummyMessages: Record<number, IMessage[]> = {
  1: [
    { sender: "Malak", text: "hello", time: "05/09/2024" },
    { sender: "Malak", text: "hello", time: "05/09/2024" },
    { receiver: "Maryam", text: "helloz", time: "05/09/2024" },
    { receiver: "Maryam", text: "helloz", time: "05/09/2024" },
  ],
  2: [
    { sender: "Maryam", text: "hello", time: "05/09/2024" },
    { sender: "maryam", text: "hello", time: "05/09/2024" },
  ],
};
export const periods: ISelectOption[] = [
  { label: "daily", value: "d" },
  { label: "monthly", value: "m" },
];
export const languageOptions: ISelectOption[] = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];
export const navItems: INavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact-us" },
];
export const authItems: string[] = ["log_in", "sign_up"];
export const menuItems: INavItem[] = [
  { label: "host_your_house", to: "/become-a-host" },
  { label: "profile", to: "/account-settings/personal-info" },
  { label: "log_out", to: "#" },
];
