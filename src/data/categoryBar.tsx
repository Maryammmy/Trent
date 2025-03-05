import { ResponsiveSetting } from "../interfaces";

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
