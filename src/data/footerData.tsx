import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { IFooterSection } from "../interfaces";
import { Link } from "react-router-dom";

export const sections: IFooterSection[] = [
  // {
  //   title: "Rooms",
  //   items: ["Standard", "Deluxe", "Family"],
  // },
  // {
  //   title: "Resources",
  //   items: ["Help Center", "Guides", "Partner Network"],
  // },
  {
    title: "Company",
    items: [
      // "About Us",
      // "Testimonials",
      <Link
        rel="noopener noreferrer"
        target="_blank"
        to="/terms-and-conditions"
      >
        Terms & Conditions
      </Link>,
      <Link rel="noopener noreferrer" target="_blank" to="/privacy-policy">
        Privacy Policy
      </Link>,
    ],
  },
];
export const newsletterSection = {
  title: "Newsletter",
  content: (
    <>
      <p>Subscribe and get the latest updates!</p>
      <div className="bg-white flex justify-between rounded-md mt-2">
        <Input
          className="py-2 px-2 outline-none bg-white w-44"
          placeholder="Enter your email"
        />
        <Button className="bg-secondary py-2 px-4 rounded-md text-white">
          Submit
        </Button>
      </div>
    </>
  ),
};

export const icons: string[] = [
  "/images/faceFooter.svg",
  "/images/instaFooter.svg",
  "/images/twitterFooter.svg",
];
