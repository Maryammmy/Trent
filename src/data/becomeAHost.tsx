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
  Zap,
  CalendarCheck,
  UserRound,
} from "lucide-react";
import {
  IGetStartedToHost,
  IInstantBook,
  IPriceBreakdown,
  IPropertyhosting,
  ITypeOfPlace,
} from "../interfaces/becomeAHost";
import { PiUsersBold, PiUsersFourBold, PiUsersThreeBold } from "react-icons/pi";

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
export const Propertyhosting: IPropertyhosting[] = [
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
export const instantBook: IInstantBook[] = [
  {
    title: "approve_your_first_5_bookings",
    text: "approve_your_first_5_bookings_text",
    desc: "approve_your_first_5_bookings_desc",
    icon: <CalendarCheck size={35} />,
  },
  {
    title: "use_instant_book",
    desc: "use_instant_book_desc",
    icon: <Zap size={35} />,
  },
];
export const visibility: IGetStartedToHost[] = [
  {
    title: "any_Trent_guest",
    desc: "any_Trent_guest_desc",
  },
  {
    title: "an_experienced guest",
    desc: "an_experienced guest_desc",
  },
];
export const priceBreakdown = (
  basePrice: number,
  guestServiceFee: number,
  totalPrice: number
): IPriceBreakdown[] => [
  { label: "base_price", value: basePrice },
  { label: "guest_service_fee", value: guestServiceFee },
  { label: "guest_price_before_taxes", value: totalPrice },
];
export const discount = [
  {
    title: "new_listing_promotion",
    desc: "new_listing_promotion_desc",
  },
  { title: "weekly_discount", desc: "weekly_discount_desc" },
  { title: "monthly_discount", desc: "monthly_discount_desc" },
];
export const LegalSafetyDetails: string[] = [
  "does_your_place_have_any_of_these_title_1",
  "does_your_place_have_any_of_these_title_2",
  "does_your_place_have_any_of_these_title_3",
];
export const howAreYouhosting = [
  "how_are_you_hosting_on_Trent_title_1",
  "how_are_you_hosting_on_Trent_title_2",
];
export const floorPlan: string[] = ["guests", "bedrooms", "beds", "bathrooms"];
export const floorPlanForRoom = ["guests", "bedrooms", "beds"];
export const doYouHaveLockForRoom = ["yes", "no"];
export const typesOFBathrooms: IGetStartedToHost[] = [
  {
    title: "private_and_attached",
    desc: "private_and_attached_desc",
  },
  { title: "dedicated", desc: "dedicated_desc" },
  { title: "shared", desc: "shared_desc" },
];
export const occupancy: IPropertyhosting[] = [
  { label: "me", icon: <UserRound size={35} /> },
  { label: "my_family", icon: <PiUsersFourBold size={35} /> },
  { label: "other_guests", icon: <PiUsersThreeBold size={35} /> },
  { label: "roommates", icon: <PiUsersBold size={35} /> },
];
