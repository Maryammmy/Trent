import { forwardRef, SelectHTMLAttributes } from "react";
import { ISelectOption } from "../../interfaces";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: ISelectOption[];
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, IProps>(
  (
    {
      options,
      className = "border bg-white border-gray-300 rounded-lg p-2",
      ...rest
    },
    ref
  ) => {
    return (
      <select ref={ref} className={`w-full ${className}`} {...rest}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
