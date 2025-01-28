import Slider from "react-slick";
import CustomNextArrow from "./CustomNextArrow";
import CustomPrevArrow from "./CustomPrevArrow";
import { useState } from "react";
import CustomDots from "./CustomDots";
import { responsive } from "../../data/categoryBar";

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
}: IProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const settings = {
    infinite: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    speed: 500,
    arrows: showArrow,
    dots: showDot,
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
    customPaging: (i: number) => (
      <CustomDots key={i} active={i === currentSlide} onClick={() => {}} />
    ),
    beforeChange: handleBeforeChange,
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default Carsoul;
