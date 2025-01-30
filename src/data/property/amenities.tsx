import {
  Wifi,
  Car,
  Dog,
  Tv,
  ShoppingBag,
  TreePine,
  WavesLadder,
  CookingPot,
  Fence,
  WashingMachine,
} from "lucide-react";
import { IAmenity } from "../../interfaces/propertyInterface";

export const amenities: IAmenity[] = [
  { text: "Kitchen", icon: <CookingPot /> },
  { text: "Wifi", icon: <Wifi /> },
  { text: "Free parking on premises", icon: <Car /> },
  { text: "Private hot tub", icon: <WavesLadder /> },
  { text: "Pets allowed", icon: <Dog /> },
  { text: "HDTV", icon: <Tv /> },
  { text: "Patio or balcony", icon: <Fence /> },
  { text: "Backyard", icon: <TreePine /> },
  { text: "Luggage dropoff allowed", icon: <ShoppingBag /> },
  { text: "WashingMachine", icon: <WashingMachine /> },
];
