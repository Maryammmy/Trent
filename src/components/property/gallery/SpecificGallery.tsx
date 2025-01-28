import { specificGallery } from "../../../data/property/gallery/specificGalleryData";
import { ExpandableText } from "../../../utils/ExpandableText";

import Image from "../../ui/Image";

function SpecificGallery() {
  return (
    <div>
      {specificGallery.map((item, index) => {
        const { title, description, images, id } = item;
        return (
          <div
            id={id}
            key={index}
            className="flex flex-col xl:flex-row flex-wrap gap-5 xl:gap-8 justify-between py-5 xl:py-8"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-medium pb-2">{title}</h2>
              <p className="text-secondary text-lg">
                <ExpandableText text={description} maxLength={50} />
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:gap-4 flex-[2]">
              {images.map((image, index) => {
                const isEven = images.length % 2 === 0;
                const firstIndex = index === 0;
                return (
                  <div
                    key={index}
                    className={`${
                      !isEven && firstIndex
                        ? "w-full h-[200px] xl:w-[800px] md:h-[500px]"
                        : "w-[47.5%] h-[100px] md:w-[48.9%] md:h-[250px]"
                    } rounded-md overflow-hidden`}
                  >
                    <Image
                      imageUrl={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SpecificGallery;
