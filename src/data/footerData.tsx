import faceIcon from "../assets/iamges/faceFooter.svg";
import instaIcon from "../assets/iamges/instaFooter.svg";
import twitterIcon from "../assets/iamges/twitterFooter.svg";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { IFooterSection } from "../interfaces";

export const sections: IFooterSection[] = [
  {
    title: "Rooms",
    items: ["Standard", "Deluxe", "Family"],
  },
  {
    title: "Resources",
    items: ["Help Center", "Guides", "Partner Network"],
  },
  {
    title: "Company",
    items: ["About Us", "Testimonials", "Terms of Service", "Privacy Policy"],
  },
  {
    title: "Newsletter",
    items: [
      "Subscribe and get the latest updates!",
      <div
        className="bg-white flex justify-between rounded-md"
        key="newsletter-input"
      >
        <Input
          className="py-2 px-2 outline-none bg-white w-44"
          placeholder="Enter your email"
        />
        <Button className="bg-secondary py-2 px-4 rounded-md text-white">
          Submit
        </Button>
      </div>,
    ],
  },
];
export const icons: string[] = [faceIcon, instaIcon, twitterIcon];
