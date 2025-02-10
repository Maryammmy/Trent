import Image from "./ui/Image";
import logo from "../assets/iamges/TrentFooter.svg";
import { icons } from "../data/footerData";
import Input from "./ui/Input";
import Button from "./ui/Button";
function Footer() {
  return (
    <footer className="pt-5 bg-[#FAFAFA]">
      <div className="px-10 max-w-screen-2xl mx-auto pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 lg:gap-5 py-5">
          <div className="flex flex-col gap-5">
            <div className="w-[40%]">
              <Image
                imageUrl={logo}
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
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg">Rooms</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <p>Standard</p>
              <p>Deluxe</p>
              <p>Family</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg">Resources</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <p>Help Center</p>
              <p>Guides</p>
              <p>Partner Network</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg">Company</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <p>About Us</p>
              <p>Testimonials</p>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg">Newsletter</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <p>Subscribe and get the latest updates!</p>
              <div className="bg-white flex justify-between rounded-md">
                <Input
                  className="py-2 px-2 outline-none bg-white w-44"
                  placeholder="Enter your email"
                />
                <Button className="bg-secondary py-2 px-4 rounded-md text-white">
                  Submit
                </Button>
              </div>
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
