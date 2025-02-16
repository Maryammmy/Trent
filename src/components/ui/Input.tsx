import { forwardRef, InputHTMLAttributes, Ref } from "react";

type IProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return <input ref={ref} {...rest} />;
});

export default Input;
