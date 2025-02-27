import { forwardRef, TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, IProps>(
  ({ className, ...rest }, ref) => {
    return <textarea ref={ref} {...rest} className={`w-full ${className}`} />;
  }
);

export default TextArea;
