import Button from "./ui/Button";
import {
  getResponsiveSettingsForCategory,
  responsive,
} from "../data/categoryBar";
import Carsoul from "./ui/Carsoul";
import { useGetData } from "../hooks/useGetData";
import { Home } from "lucide-react";
import { ITypeList } from "../interfaces/landingInterface";
import CategoryBarSkeleton from "./skeleton/CategoryBarSkeleton";

function CategoryBar() {
  const { data } = useGetData(
    ["propertyType"],
    "user_api/u_property_type.php?lang=en"
  );
  const typeList: ITypeList[] = data?.data?.typelist;

  return (
    <>
      <div className="w-full px-5 xl:px-20 py-5">
        <Carsoul
          slidesToShow={typeList?.length ? Math.min(typeList.length, 10) : 10}
          borderColor="2px solid gainsboro"
          padding="1px"
          responsive={
            typeList?.length
              ? getResponsiveSettingsForCategory(typeList.length)
              : responsive
          }
        >
          {typeList?.length > 0 ? (
            typeList.map((item, index) => (
              <Button
                key={index}
                className="flex flex-col justify-center items-center"
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
            ))
          ) : (
            <CategoryBarSkeleton cards={10} />
          )}
        </Carsoul>
      </div>
    </>
  );
}

export default CategoryBar;
