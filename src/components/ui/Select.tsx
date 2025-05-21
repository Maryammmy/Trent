import { forwardRef, SelectHTMLAttributes } from "react";
import { ISelectOption } from "../../interfaces";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    return (
      <select
        ref={ref}
        className={`w-full outline-none font-medium ${className}`}
        {...rest}
      >
        <option value="">{t("choose_option")}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value} className="font-medium">
            {t(option.label)}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
