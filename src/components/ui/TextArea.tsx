import { TextareaHTMLAttributes } from "react";
type IProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
function TextArea({ ...rest }: IProps) {
  return <textarea {...rest}></textarea>;
}

export default TextArea;
