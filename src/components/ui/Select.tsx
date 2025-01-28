import { SelectHTMLAttributes } from "react";
import { ISelectOption } from "../../interfaces";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: ISelectOption[];
}
function Select({ options, ...rest }: IProps) {
  return (
    <select className="w-full border border-gray-300 rounded-lg p-2" {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
