import { Search } from "lucide-react";
import Modal from "../../ui/Modal";
import { FaStar } from "react-icons/fa6";
import PrograssBar from "../../ui/PrograssBar";
import {
  reviewInstruction,
  reviewOptions,
  widths,
} from "../../../data/property/review";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useTranslation } from "react-i18next";
interface IProps {
  isReviewed: boolean;
  close: () => void;
}
function ReviewModal({ isReviewed, close }: IProps) {
  const { t } = useTranslation();
  // const reviewCards = Array.from({ length: 20 });
  return (
    <Modal isOpen={isReviewed} close={close} maxWidth="1024px">
      <div className="p-5">
        <div className="flex flex-col lg:flex-row justify-between gap-10 p-6 ">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FaStar size={30} />
              <span className="font-medium text-2xl">4.88</span>
            </div>
            <div className="space-y-1">
              {widths.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium">{item.num}</span>
                  <PrograssBar
                    height="4px"
                    width={item.width}
                    backgroundColor="black"
                  />
                </div>
              ))}
            </div>
            {reviewInstruction.map((item, index) => {
              const lastIndex = reviewInstruction.length - 1;
              const { icon, title, rate } = item;
              const translatedTitle = t(title);
              return (
                <div
                  key={index}
                  className={`flex justify-between items-center border-b py-3 ${
                    lastIndex === index && "border-b-0"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <h2 className="font-medium text-lg">{translatedTitle}</h2>
                  </div>
                  <div className="text-sm font-medium">{rate}</div>
                </div>
              );
            })}
          </div>
          <div className="flex-[2] pe-4 lg:max-h-[80vh]  lg:overflow-y-auto">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-center lg:justify-between">
              <div>
                <h2 className="font-medium text-2xl">57 {t("reviews")}</h2>
                <p className="text-secondary font-medium">
                  Learn how reviews work
                </p>
              </div>
              <div>
                <Select
                  options={reviewOptions.map((option) => ({
                    ...option,
                    label: t(option.label),
                  }))}
                />
              </div>
            </div>
            <div className="my-4 flex items-center gap-2 w-full outline-none border-2 border-secondary rounded-full focus-within:border-black py-2 px-4">
              <Search size={20} />
              <Input
                placeholder="Search reviews"
                type="text"
                className="outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-4">
              {/* {reviewCards.map((_, index) => (
                <ReviewCard key={index} rating={4.88} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReviewModal;
