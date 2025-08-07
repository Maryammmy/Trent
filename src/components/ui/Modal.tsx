import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
interface IProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  dialogPanelClassName?: string;
  btnColor?: string;
  closeBtn?: boolean;
  canCloseOnOutsideClick?: boolean;
}
export default function Modal({
  isOpen,
  close,
  title,
  children,
  className,
  dialogPanelClassName,
  btnColor = "black",
  closeBtn = true,
  canCloseOnOutsideClick = true,
}: IProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-[3000]"
        onClose={canCloseOnOutsideClick ? close : () => {}}
        __demoMode
      >
        <div className="fixed backdrop-blur-sm inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center md:p-4">
            <DialogPanel
              transition
              className={cn(
                "w-full max-w-[500px] rounded-xl shadow-lg bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
                dialogPanelClassName && dialogPanelClassName
              )}
            >
              {closeBtn && (
                <Button onClick={close} className="absolute top-5 right-4 z-10">
                  <X size={20} color={btnColor} />
                </Button>
              )}
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
