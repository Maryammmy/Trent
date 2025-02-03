import { Link } from "react-router-dom";
import Button from "../ui/Button";
function Header() {
  return (
    <div className="flex items-center justify-between px-5 xl:px-20 py-5 bg-primary">
      <Link to={"/"}>
        <h2 className="text-white text-4xl font-semibold">Trent</h2>
      </Link>
      <Button className="py-2 px-3 rounded-full border-2 border-white font-medium text-white">
        <span>Save & exit</span>
      </Button>
    </div>
  );
}

export default Header;
