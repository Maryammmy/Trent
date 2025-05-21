import { useState } from "react";
import Button from "../../ui/Button";
import { IFaq } from "@/interfaces/landing";
import { ChevronDown, ChevronUp } from "lucide-react";

interface IProps {
  faq: IFaq;
}

function FAQItem({ faq }: IProps) {
  const { question, answer } = faq;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
    >
      <Button
        className="flex justify-between items-center w-full"
        onClick={toggleOpen}
      >
        <h3 className="md:text-lg font-semibold text-dark">{question}</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {isOpen && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
}

export default FAQItem;
