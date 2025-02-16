import { X } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginData } from "../data/authData";
import { setIsloggedin } from "../store/features/auth/authSlice";
import SocialAuthButtons from "./SocialAuthButtons";

function LoginModal() {
  const dispatch = useAppDispatch();
  const { isLoggedin } = useAppSelector((state) => state.auth);
  return (
    <Modal
      maxWidth="600px"
      className="text-lg text-center p-4 border-b font-semibold"
      title="Log in"
      close={() => dispatch(setIsloggedin(false))}
      isOpen={isLoggedin}
    >
      <Button
        onClick={() => dispatch(setIsloggedin(false))}
        className="absolute top-5 right-4 text-gray-500 hover:text-black"
      >
        <span>
          <X className="text-black" size={20} />
        </span>
      </Button>
      <div className="p-6">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Welcome to Trent</h2>
        </div>
        {loginData.map((input, index) => {
          const { label, name, placeholder, type } = input;
          return (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">{label}</label>
              <Input
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-primary"
              />
            </div>
          );
        })}
        <Button className="w-full bg-primary text-white py-2 rounded-lg font-bold">
          <span>Log in</span>
        </Button>
        <SocialAuthButtons />
      </div>
    </Modal>
  );
}

export default LoginModal;
