import { ResponsiveSetting } from "../../../interfaces";
import { IGallery } from "../../../interfaces/property/galleryInterface";

export const gallery: IGallery[] = [
  {
    id: "Living-room",
    title: "Living room",
  },
  {
    id: "Kitchenette",
    title: "Kitchenette",
  },
  {
    id: "Dining-area",
    title: "Dining area",
  },
  {
    id: "Bedroom-1",
    title: "Bedroom 1",
  },
  {
    id: "Bedroom-2",
    title: "Bedroom 2",
  },
  {
    id: "Full-bathroom-1",
    title: "Full bathroom 1",
  },
  {
    id: "Full-bathroom-2",
    title: "Full bathroom 2",
  },
  {
    id: "Backyard",
    title: "Backyard",
  },
  {
    id: "Patio",
    title: "Patio",
  },
  {
    id: "Balcony",
    title: "Balcony",
  },
  {
    id: "Laundry-area",
    title: "Laundry area",
  },
  {
    id: "Gym",
    title: "Gym",
  },
  {
    id: "Exterior",
    title: "Exterior",
  },
  {
    id: "Pool",
    title: "Pool",
  },
  {
    id: "Hot-tub",
    title: "Hot tub",
  },
];
export const galleyCarsoulResponsive: ResponsiveSetting[] = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
    },
  },
];
