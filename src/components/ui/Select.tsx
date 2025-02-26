import { SelectHTMLAttributes } from "react";
import { ISelectOption } from "../../interfaces";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: ISelectOption[];
  className?: string;
}
function Select({
  options,
  className = "w-full border bg-white border-gray-300 rounded-lg p-2",
  ...rest
}: IProps) {
  return (
    <select className={`${className}`} {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
