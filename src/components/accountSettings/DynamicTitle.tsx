import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
}
function DynamicTitle({ title }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Link
          to="/account-settings"
          className="text-stone-700 font-semibold text-lg"
        >
          Account
        </Link>
        <ChevronRight className="text-secondary" size={20} />
        <h2 className="text-stone-700 font-semibold text-lg">{title}</h2>
      </div>
      <h2 className="text-stone-700 text-4xl font-bold">{title}</h2>
    </div>
  );
}

export default DynamicTitle;
