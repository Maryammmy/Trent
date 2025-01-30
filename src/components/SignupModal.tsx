import { X } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Image from "./ui/Image";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { buttons } from "../data";
import { signupData } from "../data/authData";
import { setIsSignup } from "../store/features/auth/authSlice";

function SignupModal() {
  const dispatch = useAppDispatch();
  const { isSignup } = useAppSelector((state) => state.auth);
  return (
    <Modal
      maxWidth="600px"
      className="text-lg text-center p-4 border-b font-semibold"
      title="Signup"
      close={() => dispatch(setIsSignup(false))}
      isOpen={isSignup}
    >
      <Button
        onClick={() => dispatch(setIsSignup(false))}
        className="absolute top-5 right-4 text-gray-500 hover:text-black"
      >
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Welcome to Trent</h2>
        </div>
        {signupData.map((input, index) => {
          const { label, name, placeholder, type } = input;
          return (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">{label}</label>
              <Input
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg focus:outline-primary p-2"
              />
            </div>
          );
        })}
        <Button className="w-full bg-primary text-white py-2 rounded-lg font-bold">
          <span> Signup</span>
        </Button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">or</p>
          <div className="flex flex-col gap-2 mt-2">
            {buttons.map((button) => (
              <Button
                key={button.id}
                className="w-full border font-semibold border-gray-300 rounded-lg py-2 px-5 flex items-center gap-2"
              >
                {typeof button.icon === "string" ? (
                  <div>
                    <Image
                      imageUrl={button.icon}
                      alt={`image ${button.id}`}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                ) : (
                  <div>{button.icon}</div>
                )}
                <span className="text-center flex-1">{button.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SignupModal;
