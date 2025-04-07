import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}
function Alert({
  children,
  className = "px-2 py-3 font-medium text-center rounded bg-red-100 border border-red-400 text-red-700",
}: IProps) {
  return (
    <div className={className} role="alert">
      {children}
    </div>
  );
}

export default Alert;
