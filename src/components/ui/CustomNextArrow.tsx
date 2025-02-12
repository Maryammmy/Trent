import { ChevronRight } from "lucide-react";
interface IProps {
  onClick?: () => void;
  borderColor?: string;
  right?: string;
  top?: string;
  padding?: string;
}
export default function CustomNextArrow({
  onClick,
  borderColor,
  right = "0px",
  top = "50%",
  padding = "8px",
}: IProps) {
  return (
    <div
      className={`absolute  transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-100 transition-all`}
      style={{
        border: borderColor,
        right: right,
        top: top,
        padding: padding,
      }}
      onClick={onClick}
    >
      <ChevronRight size={20} strokeWidth={3} />
    </div>
  );
}
