import { ChevronLeft } from "lucide-react";
import {
  gallery,
  galleyCarsoulResponsive,
} from "../../data/property/gallery/galleryData";
import Image from "../../components/ui/Image";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Carsoul from "../../components/ui/Carsoul";
import { useMediaQuery } from "react-responsive";
import SpecificGallery from "../../components/property/gallery/SpecificGallery";

function Gallery() {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  return (
    <div className="px-5 xl:px-20 py-5">
      <div className="fixed top-8 left-0 xl:left-20">
        <Link to="/properties/1">
          <ChevronLeft />
        </Link>
      </div>
      <div className="py-5 max-w-[1200px] mx-auto">
        <h2 className="font-bold text-2xl py-6">Photo tour</h2>
        {isLargeScreen ? (
          <div className="flex flex-wrap gap-5">
            {gallery.map((item, index) => {
              const { image, title, id } = item;
              return (
                <HashLink to={`#${id}`} key={index}>
                  <div className="w-[150px] h-[100px] overflow-hidden rounded-md shadow-md">
                    <Image
                      imageUrl={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{title}</h3>
                </HashLink>
              );
            })}
          </div>
        ) : (
          <Carsoul showArrow={false} responsive={galleyCarsoulResponsive}>
            {gallery.map((item, index) => {
              const { image, title } = item;
              return (
                <div key={index}>
                  <div className="w-[130px] h-[100px] overflow-hidden rounded-md shadow-md">
                    <Image
                      imageUrl={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{title}</h3>
                </div>
              );
            })}
          </Carsoul>
        )}
        <SpecificGallery />
      </div>
    </div>
  );
}

export default Gallery;
