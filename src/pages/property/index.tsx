import { Link } from "react-router-dom";
import CheckDates from "../../components/property/CheckDates";
import HostedBy from "../../components/property/HostedBy";
import Image from "../../components/ui/Image";
import { images } from "../../data";
import { useState } from "react";
import ReviewModal from "../../components/property/reviews/ReviewModal";
import { Button } from "@headlessui/react";

function Property() {
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  return (
    <>
      <div className="px-5 xl:px-20 py-2 lg:py-6">
        <div className="pb-6">
          <h2 className="font-bold text-2xl text-stone-800">
            Tiny house close to Rotterdam
          </h2>
        </div>
        <div className="flex gap-5 flex-col xl:flex-row flex-wrap">
          <div className="xl:flex-[0_0_49%] h-[240px] xl:h-[500px]">
            <Link to={`/properties/1/gallery`}>
              <Image
                imageUrl={images[0]}
                alt="main Image"
                className="w-full  h-full object-cover rounded-md xl:rounded-l-md  xl:rounded-r-none"
              />
            </Link>
          </div>
          <div className=" xl:flex-[0_0_49%] flex flex-col md:flex-row flex-wrap gap-5">
            {images?.map((image: string, i: number) => (
              <div
                key={i}
                className={`w-full 
                 md:w-[350px] lg:w-[480px] xl:w-[48%] 2xl:w-[48.5%]
             h-[240px] rounded-md xl:rounded-r-md  xl:rounded-l-none overflow-hidden`}
              >
                <Link to={`/properties/1/gallery`}>
                  <Image
                    className={`w-full h-full object-cover`}
                    imageUrl={image}
                    alt={`Image ${i + 1}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="py-8 flex flex-col lg:flex-row gap-10 xl:gap-20 md:justify-between">
          <div className="flex-[2]">
            <div className="pb-5">
              <p className="font-medium text-black text-2xl">
                ntire home in IJmuiden, Netherlands
              </p>
              <p className="text-black font-medium">
                10guests.4bedrooms.9beds.3.5baths
              </p>
            </div>
            <HostedBy />
          </div>
          <CheckDates />
        </div>
        <Button
          onClick={() => setIsReviewed(true)}
          className="font-semibold text-2xl"
        >
          <span> Review</span>
        </Button>
      </div>
      <ReviewModal isReviewed={isReviewed} close={() => setIsReviewed(false)} />
    </>
  );
}

export default Property;
