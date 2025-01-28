import { ChevronLeft } from "lucide-react";
interface IProps {
  onClick?: () => void;
  borderColor?: string;
  left?: string;
  top?: string;
  padding?: string;
}
export default function CustomPrevArrow({
  onClick,
  borderColor,
  left = "0px",
  top = "50%",
  padding = "8px",
}: IProps) {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-all`}
      style={{ border: borderColor, left: left, top: top, padding: padding }}
      onClick={onClick}
    >
      <ChevronLeft size={20} strokeWidth={3} />
    </div>
  );
}
