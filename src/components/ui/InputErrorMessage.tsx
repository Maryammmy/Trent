interface IProps {
  msg?: string;
}
const InputErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <span className="block text-red-700  text-sm break-words">{msg}</span>
  ) : null;
};

export default InputErrorMessage;
