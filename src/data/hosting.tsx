import {
  Home,
  Building,
  Bed,
  Sailboat,
  Car,
  Building2,
  Castle,
  Mountain,
  Package,
  Home as CycladicHome,
  Circle,
  TreeDeciduous,
  BedDouble,
  Hotel,
  Warehouse,
  Store,
  University,
  TowerControl,
  DoorClosed,
  UsersRound,
} from "lucide-react";
import {
  IGetStartedToHost,
  IPropertyHosting,
  ITypeOfPlace,
} from "../interfaces/hostingInterface";

export const getStartedToHost: IGetStartedToHost[] = [
  {
    title: "Tell us about your place",
    desc: "Share some basic info, like where it is and how many guests can stay.",
  },
  {
    title: "Make it stand out",
    desc: "Add 5 or more photos plus a title and description—we’ll help you out.",
  },
  {
    title: "Finish up and publish",
    desc: "Choose a starting price, verify a few details, then publish your listing.",
  },
];
export const PropertyHosting: IPropertyHosting[] = [
  { label: "House", icon: <Home size={35} /> },
  { label: "Apartment", icon: <Building size={35} /> },
  { label: "Barn", icon: <Warehouse size={35} /> },
  { label: "Bed & Breakfast", icon: <Bed size={35} /> },
  { label: "Boat", icon: <Sailboat size={35} /> },
  { label: "Cabin", icon: <Store size={35} /> },
  { label: "Camper/RV", icon: <Car size={35} /> },
  { label: "Casa particular", icon: <Building2 size={35} /> },
  { label: "Castle", icon: <Castle size={35} /> },
  { label: "Cave", icon: <Mountain size={35} /> },
  { label: "Container", icon: <Package size={35} /> },
  { label: "Cycladic home", icon: <CycladicHome size={35} /> },
  { label: "Dome", icon: <Circle size={35} /> },
  { label: "Earth home", icon: <TreeDeciduous size={35} /> },
  { label: "Farm", icon: <University size={35} /> },
  { label: "Guesthouse", icon: <BedDouble size={35} /> },
  { label: "Hotel", icon: <Hotel size={35} /> },
  { label: "Tower", icon: <TowerControl size={35} /> },
];
export const typeOfPlace: ITypeOfPlace[] = [
  {
    title: "An entire place",
    desc: "Guests have the whole place to themselves.",
    icon: <Home size={35} />,
  },
  {
    title: "A room",
    desc: "Guests have their own room in a home, plus access to shared spaces.",
    icon: <DoorClosed size={35} />,
  },
  {
    title: "A shared room in a hotel",
    desc: "Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.",
    icon: <UsersRound size={35} />,
  },
];
