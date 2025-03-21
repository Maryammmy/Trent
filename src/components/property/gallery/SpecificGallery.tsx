import { specificGallery } from "../../../data/property/gallery/specificGalleryData";
import { ExpandableText } from "../../../utils/ExpandableText";
import Image from "../../ui/Image";
import PhotoViewer from "../../ui/PhotoViewer";

function SpecificGallery() {
  const images = Array.from({ length: 2 });
  return (
    <div>
      {specificGallery.map((item, index) => {
        const { title, description, id } = item;
        return (
          <div
            id={id}
            key={index}
            className="flex flex-col xl:flex-row flex-wrap gap-5 xl:gap-8 justify-between py-5 xl:py-8"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-medium pb-2">{title}</h2>
              <p className="text-dark text-lg">
                <ExpandableText text={description} maxLength={50} />
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:gap-4 flex-[2]">
              {images.map((_, index) => {
                const isEven = images.length % 2 === 0;
                const firstIndex = index === 0;
                return (
                  <PhotoViewer key={index} src="/images/Trent-logo-pdf.png">
                    <div
                      className={`${
                        !isEven && firstIndex
                          ? "w-full h-[200px] xl:w-[800px] md:h-[500px]"
                          : "w-[47.5%] h-[100px] md:w-[48.9%] md:h-[250px]"
                      } rounded-md overflow-hidden`}
                    >
                      <Image
                        imageUrl="/images/Trent-logo-pdf.png"
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </PhotoViewer>
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
