import {
  FireExtinguisher,
  KeyRound,
  MessageSquare,
  SearchCheck,
  Map,
  AppWindow,
} from "lucide-react";
import {
  IReview,
  IReviewInstruction,
  IWidth,
} from "../../interfaces/propertyInterface";
import { ISelectOption } from "../../interfaces";

export const reviewInstruction: IReviewInstruction[] = [
  {
    icon: <FireExtinguisher size={30} className="text-stone-800" />,
    title: "Cleanliness",
    rate: "4.5",
  },
  {
    icon: <SearchCheck size={30} className="text-stone-800" />,
    title: "Accuracy",
    rate: "4.9",
  },
  {
    icon: <KeyRound size={30} className="text-stone-800" />,
    title: "Check-in",
    rate: "4.9",
  },
  {
    icon: <MessageSquare size={30} className="text-stone-800" />,
    title: "Communication",
    rate: "5.0",
  },
  {
    icon: <Map size={30} className="text-stone-800" />,
    title: "Location",
    rate: "5.0",
  },
  {
    icon: <AppWindow size={30} className="text-stone-800" />,
    title: "Value",
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
export const review: IReview = {
  image:
    "data:image/jpeg;base64,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",
  name: "Odd Inge",
  rating: 4,
  duration: "4 years on Trent",
  when: "July 2023",
  text: "We had a nice mini vacation in Pekka's great cabin. The nature round is beautiful, the lake lovely to swim in. Peace and quiet.",
};
export const reviewOptions: ISelectOption[] = [
  { value: "most-recent", label: "Most recent" },
  { value: "highest-rated", label: "Highest rated" },
  { value: "lowest-rated", label: "Lowest rated" },
];
