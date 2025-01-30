import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleDarkMode } from "../store/features/darkMode/darkModeSlice";
import { Moon, Sun } from "lucide-react";
import Button from "./ui/Button";

const DarkModeToggle = () => {
  const { darkMode } = useSelector((state: RootState) => state.darkMode);
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        onClick={() => dispatch(toggleDarkMode())}
        className="px-4 py-2 bg-blue-600  text-white  rounded-lg shadow-md transition-colors duration-300"
      >
        <span>{darkMode ? <Sun /> : <Moon />}</span>
      </Button>
    </div>
  );
};

export default DarkModeToggle;
