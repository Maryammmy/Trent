import {
  FireExtinguisher,
  KeyRound,
  MessageSquare,
  SearchCheck,
  Map,
  AppWindow,
} from "lucide-react";
import { IReviewInstruction, IWidth } from "../../interfaces/property";
import { ISelectOption } from "../../interfaces";

export const reviewInstruction: IReviewInstruction[] = [
  {
    icon: <FireExtinguisher size={30} className="text-stone-800" />,
    title: "cleanliness",
    rate: "4.5",
  },
  {
    icon: <SearchCheck size={30} className="text-stone-800" />,
    title: "accuracy",
    rate: "4.9",
  },
  {
    icon: <KeyRound size={30} className="text-stone-800" />,
    title: "check_in",
    rate: "4.9",
  },
  {
    icon: <MessageSquare size={30} className="text-stone-800" />,
    title: "communication",
    rate: "5.0",
  },
  {
    icon: <Map size={30} className="text-stone-800" />,
    title: "location",
    rate: "5.0",
  },
  {
    icon: <AppWindow size={30} className="text-stone-800" />,
    title: "value",
    rate: "4.8",
  },
];
export const widths: IWidth[] = [
  { num: 5, width: "80%" },
  { num: 4, width: "60%" },
  { num: 3, width: "40%" },
  { num: 2, width: "20%" },
  { num: 1, width: "10%" },
];
export const reviewOptions: ISelectOption[] = [
  { value: "most-recent", label: "most_recent" },
  { value: "highest-rated", label: "highest_rated" },
  { value: "lowest-rated", label: "lowest_rated" },
];
