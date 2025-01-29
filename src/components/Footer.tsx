import { Trent, hosting, icons, support, titles } from "../data/footerData";
import Image from "./ui/Image";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="pt-5 bg-[#F7F7F7]">
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
    </footer>
  );
}

export default Footer;
