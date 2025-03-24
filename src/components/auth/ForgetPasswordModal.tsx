import { X } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
interface IProps {
  close: () => void;
  isOpen: boolean;
}
function ForgetPasswordModal({ isOpen, close }: IProps) {
  return (
    <Modal
      maxWidth="550px"
      className="text-2xl text-center p-4 border-b font-semibold"
      title="Forget password"
      close={close}
      isOpen={isOpen}
    >
      <Button onClick={close} className="absolute top-5 right-4">
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-5 md:py-8 md:px-10">
        <div className="pb-6">
          <p className="text-[#757575] font-medium px-1 text-center md:px-0 break-words">
            Just enter your email and we will send you the
            <span className="text-center"> verification code</span>
          </p>
        </div>
        <form>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-600 font-medium text-sm pb-1"
            >
              Your Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="cursor-pointer p-3 rounded-lg border-2 border-gray-300 hover:border-black focus:border-primary outline-none"
              id="email"
              name="email"
            />
          </div>
          <Button
            type="submit"
            className="bg-primary zoom w-full mt-6 py-3 px-3 rounded-lg text-white font-semibold text-sm text-center"
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default ForgetPasswordModal;
