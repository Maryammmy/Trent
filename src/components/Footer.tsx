import Image from "./ui/Image";
import { icons, newsletterSection, sections } from "../data/footerData";

function Footer() {
  return (
    <footer className="pt-5 bg-[#FAFAFA]">
      <div className="px-10 max-w-screen-2xl mx-auto pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 lg:gap-5 py-5">
          <div className="flex flex-col gap-5">
            <div className="w-[40%]">
              <Image
                imageUrl="/images/Trent-blue.svg"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-dark font-medium">
              Your trusted booking service for seamless reservations and
              unforgettable experiences.
            </p>
            <div className="flex gap-2">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-lg bg-gray-300 flex justify-center items-center"
                >
                  <div className="w-[40%]">
                    <Image
                      imageUrl={icon}
                      alt={icon}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h2 className="font-bold text-lg">{section.title}</h2>
              <div className="flex flex-col gap-2 text-dark font-medium">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="hover:underline">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg">{newsletterSection.title}</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              {newsletterSection.content}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary py-2 flex justify-center items-center">
        <p className="text-white font-medium text-center">
          © 2025 — Design and Develope by Catalyst
        </p>
      </div>
    </footer>
  );
}

export default Footer;
