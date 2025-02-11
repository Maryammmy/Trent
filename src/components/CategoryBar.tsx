import Button from "./ui/Button";
import { navbarIcons, responsive } from "../data/categoryBar";
import Carsoul from "./ui/Carsoul";

function CategoryBar() {
  return (
    <div className={`w-full  px-5 xl:px-20 py-5 bg-white transition-shadow`}>
      <Carsoul
        slidesToShow={10}
        borderColor="2px solid gainsboro"
        padding="1px"
        responsive={responsive}
      >
        {navbarIcons.map((item, index) => (
          <Button
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <div className="w-fit mx-auto mb-2">
              <div className="w-12 h-12 flex justify-center items-center rounded-full border hover:border-black border-dark">
                {item.icon}
              </div>
            </div>
            <div className="text-sm font-semibold text-dark">{item.title}</div>
          </Button>
        ))}
      </Carsoul>
    </div>
  );
}

export default CategoryBar;
