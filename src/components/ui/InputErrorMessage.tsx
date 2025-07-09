import { useTranslation } from "react-i18next";

interface IProps {
  msg?: string;
}
const InputErrorMessage = ({ msg }: IProps) => {
  const { t } = useTranslation();
  return msg ? (
    <span className="block text-red-700 text-sm">{t(msg)}</span>
  ) : null;
};

export default InputErrorMessage;
