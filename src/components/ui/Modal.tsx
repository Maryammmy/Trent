import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";
interface IProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  btnColor?: string;
}
export default function Modal({
  isOpen,
  close,
  title,
  children,
  className,
  maxWidth = "500px",
  btnColor = "black",
}: IProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-[3000]"
        onClose={close}
        __demoMode
      >
        <div className="fixed backdrop-blur-sm inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center md:p-4">
            <DialogPanel
              transition
              style={{ maxWidth: maxWidth }}
              className="w-full lg:max-h-[90vh] rounded-xl shadow-lg bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Button onClick={close} className="absolute top-5 right-4 z-10">
                <X size={20} color={btnColor} />
              </Button>
              {title && (
                <DialogTitle as="h3" className={className}>
                  {title}
                </DialogTitle>
              )}
              <div>{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
