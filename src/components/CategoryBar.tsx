// import { SlidersHorizontal } from "lucide-react";
import Button from "./ui/Button";
import { navbarIcons } from "../data/categoryBar";
import Carsoul from "./ui/Carsoul";
import useScrollShadow from "../hooks/useScrollShadow";
import { useAppSelector } from "../store/hooks";

function CategoryBar() {
  const { shadow } = useAppSelector((state) => state.categoryBar);
  useScrollShadow();

  return (
    <div
      className={`fixed top-[81px] lg:top-[113px] z-20 w-full  bg-white px-5 xl:px-20 py-5 transition-shadow ${
        shadow ? "shadow-lg" : ""
      }`}
    >
      <Carsoul
        slidesToShow={10}
        borderColor="2px solid gainsboro"
        padding="1px"
      >
        {navbarIcons.map((item, index) => (
          <Button key={index} className="">
            <div>{item.icon}</div>
            <div className="text-sm font-medium ">{item.title}</div>{" "}
          </Button>
        ))}
      </Carsoul>
      {/* <Button className="flex items-center justify-center border py-2 px-2 rounded-lg gap-1 hover:border-black">
        <SlidersHorizontal strokeWidth={3} size={15} />
        <span className="text-sm font-medium">Filter</span>
      </Button> */}
    </div>
  );
}

export default CategoryBar;
