import Modal from "@/components/ui/Modal";
import { FaFacebook, FaWhatsapp, FaTelegram, FaRegCopy } from "react-icons/fa";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

interface IProps {
  url: string;
  open: boolean;
  onClose: () => void;
}
function ShareModal({ url, open, onClose }: IProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Modal
      isOpen={open}
      close={onClose}
      title={t("share_this_place")}
      className="py-6 text-center text-xl font-semibold text-primary"
    >
      <div className="p-8 pt-0">
        <div className="flex items-center gap-2 mb-6">
          <Input
            type="text"
            value={url}
            readOnly
            className="flex-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-700 text-sm outline-none"
          />
          <Button
            onClick={handleCopy}
            className="p-2 rounded-md bg-gray-200 hover:bg-primary/10 text-primary transition"
            title={t("copy_link")}
          >
            <FaRegCopy size={20} />
          </Button>
          {copied && (
            <span className="text-green-600 text-xs ml-2 font-medium">
              {t("copied")}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-6 mb-2">
          <FacebookShareButton url={url}>
            <FaFacebook
              size={36}
              color="#1877f3"
              className="hover:scale-110 transition"
            />
          </FacebookShareButton>
          <WhatsappShareButton url={url}>
            <FaWhatsapp
              size={36}
              color="#25d366"
              className="hover:scale-110 transition"
            />
          </WhatsappShareButton>
          <TwitterShareButton url={url}>
            <FaSquareXTwitter
              size={36}
              color="black"
              className="hover:scale-110 transition"
            />
          </TwitterShareButton>
          <TelegramShareButton url={url}>
            <FaTelegram
              size={36}
              color="#229ed9"
              className="hover:scale-110 transition"
            />
          </TelegramShareButton>
        </div>
      </div>
    </Modal>
  );
}

export default ShareModal;
