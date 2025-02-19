import {
  Castle,
  Flame,
  House,
  School,
  Trees,
  Waves,
  WavesLadder,
} from "lucide-react";
import { ResponsiveSetting } from "../interfaces";

export const categoryBar = [
  {
    icon: <School className="m-auto" />,
    title: "Villa",
  },
  {
    icon: <House className="m-auto" />,
    title: "Home",
  },
  {
    icon: <School className="m-auto" />,
    title: "Apartment",
  },
  {
    icon: <School className="m-auto" />,
    title: "Hotel",
  },
  {
    icon: <House className="m-auto" />,
    title: "Resort",
  },
  {
    icon: <WavesLadder className="m-auto" />,
    title: "Amazing pools",
  },
  {
    icon: <Trees className="m-auto" />,
    title: "National parks",
  },
  {
    icon: <Castle className="m-auto" />,
    title: "Castles",
  },
  {
    icon: <Flame className="m-auto" />,
    title: "Trending",
  },
  {
    icon: <Waves className="m-auto" />,
    title: "Beaches",
  },
  {
    icon: <WavesLadder className="m-auto" />,
    title: "Amazing pools",
  },
  {
    icon: <Trees className="m-auto" />,
    title: "National parks",
  },
  {
    icon: <House className="m-auto" />,
    title: "Cabins",
  },
  {
    icon: <Castle className="m-auto" />,
    title: "Castles",
  },
  {
    icon: <Flame className="m-auto" />,
    title: "Trending",
  },
  {
    icon: <School className="m-auto" />,
    title: "Rooms",
  },
  {
    icon: <Waves className="m-auto" />,
    title: "Beaches",
  },
];
export const responsive: ResponsiveSetting[] = [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: 5,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 375,
    settings: {
      slidesToShow: 2,
    },
  },
];
export const getResponsiveSettingsForCategory = (
  sliderLength: number
): ResponsiveSetting[] => [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: Math.min(sliderLength, 5),
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: Math.min(sliderLength, 4),
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: Math.min(sliderLength, 3),
    },
  },
  {
    breakpoint: 375,
    settings: {
      slidesToShow: 2,
    },
  },
];
