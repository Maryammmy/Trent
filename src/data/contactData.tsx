import { MapPin, Phone } from "lucide-react";
import { IFormContact } from "../interfaces/contactInterface";

export const formContactData: IFormContact[] = [
  { label: "Name", name: "name", placeholder: "Enter your name" },
  { label: "Email", name: "email", placeholder: "Enter your email" },
  { label: "Message", name: "message", placeholder: "Enter your message" },
];
export const contactInfo = [
  {
    title: "Our Office Location",
    text: "1234, Street Address, City, State, Zip Code, Country",
    icon: <MapPin className="text-primary" />,
  },
  {
    title: "Phone (Landline)",
    text: "123-456-7890",
    icon: <Phone className="text-primary" />,
  },
];
