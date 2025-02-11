import Slider from "react-slick";
import CustomNextArrow from "./CustomNextArrow";
import CustomPrevArrow from "./CustomPrevArrow";
import { ResponsiveSetting } from "../../interfaces";

interface IProps {
  children: React.ReactNode;
  slidesToShow?: number;
  borderColor?: string;
  showDot?: boolean;
  showArrow?: boolean;
  left?: string;
  right?: string;
  top?: string;
  padding?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  responsive?: ResponsiveSetting[];
}

function Carsoul({
  children,
  slidesToShow = 1,
  borderColor,
  showDot,
  showArrow = true,
  left,
  right,
  top,
  padding,
  autoplay,
  autoplaySpeed = 5000,
  responsive,
}: IProps) {
  const settings = {
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    infinite: true,
    arrows: showArrow,
    dots: showDot,
    dotsClass: "custom-dots",
    nextArrow: (
      <CustomNextArrow
        borderColor={borderColor}
        right={right}
        top={top}
        padding={padding}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        borderColor={borderColor}
        left={left}
        top={top}
        padding={padding}
      />
    ),
    responsive: responsive,
  };

  return (
    <div className="relative">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default Carsoul;
