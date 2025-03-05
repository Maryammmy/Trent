import Button from "./ui/Button";
import { responsive } from "../data/categoryBar";
import Carsoul from "./ui/Carsoul";
import { Home } from "lucide-react";
import CategoryBarSkeleton from "./skeleton/CategoryBarSkeleton";
import { IPropertyType } from "../interfaces";
import { usePropertyTypesAPI } from "../services/filtersService";

function CategoryBar() {
  const { data } = usePropertyTypesAPI();
  const propertyTypeList: IPropertyType[] = data?.data?.category_list;
  const categoryBarSkeleton = Array.from({ length: 10 });
  return (
    <>
      <div className="w-full px-5 xl:px-20 pt-5 pb-5">
        {!propertyTypeList ? (
          <Carsoul
            slidesToShow={10}
            borderColor="2px solid gainsboro"
            padding="1px"
            infinite={false}
            responsive={responsive}
          >
            {categoryBarSkeleton.map((_, index) => (
              <CategoryBarSkeleton key={index} />
            ))}
          </Carsoul>
        ) : propertyTypeList?.length ? (
          <Carsoul
            slidesToShow={10}
            borderColor="2px solid gainsboro"
            padding="1px"
            infinite={false}
            responsive={responsive}
          >
            {propertyTypeList?.map((item, index) => (
              <Button
                key={index}
                className="flex flex-col justify-center items-center pt-2 zoom"
              >
                <span className="w-fit mx-auto mb-2 block">
                  <span className="w-12 h-12 flex justify-center items-center rounded-full border hover:border-black border-dark">
                    <Home />
                  </span>
                </span>
                <span className="text-sm font-semibold text-dark block">
                  {item?.title}
                </span>
              </Button>
            ))}
          </Carsoul>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CategoryBar;
