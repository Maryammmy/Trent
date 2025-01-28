import { useState } from "react";
import Button from "../components/ui/Button";
interface ExpandableTextProps {
  text: string;
  maxLength: number;
}
export const ExpandableText = ({ text, maxLength }: ExpandableTextProps) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const toggleTruncation = () => {
    setIsTruncated((prev) => !prev);
  };
  const displayText =
    isTruncated && text.length > maxLength ? text.slice(0, maxLength) : text;

  return (
    <span>
      {displayText}
      {text.length > maxLength && (
        <Button
          onClick={toggleTruncation}
          className="text-secondary underline hover:text-stone-600 font-bold ml-1"
        >
          {isTruncated ? "Show more" : "Show less"}
        </Button>
      )}
    </span>
  );
};
