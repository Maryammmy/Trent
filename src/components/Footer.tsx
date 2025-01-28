import { Globe } from "lucide-react";
import {
  Trent,
  categories,
  hosting,
  icons,
  SpecificCategories,
  support,
  titles,
} from "../data/footerData";
import Button from "./ui/Button";
import Carsoul from "./ui/Carsoul";
import { useMediaQuery } from "react-responsive";
import Image from "./ui/Image";
import { Link } from "react-router-dom";
function Footer() {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  return (
    <footer className="pt-10 bg-[#F7F7F7]">
      <div className="border-b px-5 xl:px-20">
        <h2 className="font-bold text-2xl pb-5 lg:pb-2">
          Inspiration for future getaways
        </h2>
        {isLargeScreen ? (
          <div className="flex flex-wrap gap-10 py-4 border-b">
            {categories.map((category, index) => (
              <Button className="text-secondary font-semibold" key={index}>
                {category}
              </Button>
            ))}
          </div>
        ) : (
          <Carsoul
            slidesToShow={8}
            borderColor="2px solid gainsboro"
            padding="1px"
          >
            {categories.map((category, index) => (
              <Button
                className="text-secondary font-semibold whitespace-nowrap"
                key={index}
              >
                {category}
              </Button>
            ))}
          </Carsoul>
        )}
        <ul className="grid grid-cols-2  md:grid-cols-4 xl:grid-cols-6 gap-5 py-5">
          {SpecificCategories.map((category, index) => (
            <li key={index} className="text-sm text-gray-600">
              <h2 className="font-semibold">{category.title}</h2>
              <p>{category.item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 xl:px-20 grid grid-cols-1 md:grid-cols-3">
        {titles.map((title, index) => (
          <ul key={index} className="flex flex-col gap-2 border-b py-5">
            <li className="font-semibold">{title}</li>
            {title === "Support" &&
              support.map((item, index) => (
                <li className="" key={index}>
                  {item}
                </li>
              ))}
            {title === "Hosting" &&
              hosting.map((item, index) => <li key={index}>{item}</li>)}
            {title === "Trent" &&
              Trent.map((item, index) => (
                <li className="font-bold" key={index}>
                  <Link to={item.to}> {item.title}</Link>
                </li>
              ))}
          </ul>
        ))}
      </div>
      <div className="px-5 xl:px-20 py-5">
        <div className="flex flex-col lg:flex-row gap-4 md:justify-between">
          <p className="font-medium">
            © 2025 Trent, Inc. · Terms · Sitemap · Privacy · Your Privacy
            Choices
          </p>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <Globe size={18} />
              <span>Arabic (Egypt)</span>
            </div>
            <div>
              <p>EGP</p>
            </div>
            <div className="flex gap-3">
              {icons.map((icon, index) => (
                <Image
                  key={index}
                  imageUrl={icon}
                  alt={`image ${index}`}
                  className="w-6 h-6 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
