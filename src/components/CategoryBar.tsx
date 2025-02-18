import Button from "./ui/Button";
import { categoryBar, responsive } from "../data/categoryBar";
import Carsoul from "./ui/Carsoul";

function CategoryBar() {
  return (
    <div className="w-full px-5 xl:px-20 py-5">
      <Carsoul
        slidesToShow={10}
        borderColor="2px solid gainsboro"
        padding="1px"
        responsive={responsive}
      >
        {categoryBar.map((item, index) => (
          <Button
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <span className="w-fit mx-auto mb-2 block">
              <span className="w-12 h-12 flex justify-center items-center rounded-full border hover:border-black border-dark">
                {item.icon}
              </span>
            </span>
            <span className="text-sm font-semibold text-dark block">
              {item.title}
            </span>
          </Button>
        ))}
      </Carsoul>
    </div>
  );
}

export default CategoryBar;
