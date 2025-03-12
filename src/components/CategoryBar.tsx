import Button from "./ui/Button";
import { responsive } from "../data/categoryBar";
import Carsoul from "./ui/Carsoul";
import CategoryBarSkeleton from "./skeleton/CategoryBarSkeleton";
import { IPropertyType } from "../interfaces";
import { usePropertyTypesAPI } from "../services/filtersService";
import Image from "./ui/Image";
import { baseURL } from "../services";
import { useContext } from "react";
import { FilterDataContext } from "../context/FilterDataContext";

function CategoryBar() {
  const { category, setCategory } = useContext(FilterDataContext);
  const { data } = usePropertyTypesAPI();
  const propertyTypeList: IPropertyType[] = data?.data?.data?.category_list;
  const categoryBarSkeleton = Array.from({ length: 10 });
  const handleSelectedPropertyType = (id: string) => setCategory(id);
  return (
    <>
      <div className="w-full px-5 xl:px-20 py-5" data-aos="fade-right">
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
            {propertyTypeList?.map((item) => (
              <Button
                onClick={() => handleSelectedPropertyType(item?.id)}
                key={item?.id}
                className="flex flex-col justify-center items-center pt-2 zoom"
              >
                <div className="w-fit mx-auto mb-2 block">
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full  ${
                      category === item?.id
                        ? "border-2 border-primary"
                        : "border border-dark"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        imageUrl={baseURL + item.img}
                        alt={item?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-dark block">
                  {item?.title}
                </p>
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
