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
    title: "tell_us_about_your_place",
    desc: "tell_us_about_your_place_desc",
  },
  {
    title: "make_it_stand_out",
    desc: "make_it_stand_out_desc",
  },
  {
    title: "finish_up_and_publish",
    desc: "finish_up_and_publish_desc",
  },
];
export const PropertyHosting: IPropertyHosting[] = [
  { label: "house", icon: <Home size={35} /> },
  { label: "apartment", icon: <Building size={35} /> },
  { label: "barn", icon: <Warehouse size={35} /> },
  { label: "bed_and_breakfast", icon: <Bed size={35} /> },
  { label: "boat", icon: <Sailboat size={35} /> },
  { label: "cabin", icon: <Store size={35} /> },
  { label: "camper_RV", icon: <Car size={35} /> },
  { label: "Casa particular", icon: <Building2 size={35} /> },
  { label: "castle", icon: <Castle size={35} /> },
  { label: "cave", icon: <Mountain size={35} /> },
  { label: "container", icon: <Package size={35} /> },
  { label: "cycladic_home", icon: <CycladicHome size={35} /> },
  { label: "dome", icon: <Circle size={35} /> },
  { label: "earth_home", icon: <TreeDeciduous size={35} /> },
  { label: "farm", icon: <University size={35} /> },
  { label: "guesthouse", icon: <BedDouble size={35} /> },
  { label: "hotel", icon: <Hotel size={35} /> },
  { label: "tower", icon: <TowerControl size={35} /> },
];
export const typeOfPlace: ITypeOfPlace[] = [
  {
    title: "entire_place",
    desc: "entire_place_desc",
    icon: <Home size={35} />,
  },
  {
    title: "room",
    desc: "room_desc",
    icon: <DoorClosed size={35} />,
  },
  {
    title: "shared_room",
    desc: "shared_room_desc",
    icon: <UsersRound size={35} />,
  },
];
