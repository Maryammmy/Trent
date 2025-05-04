import Image from "./ui/Image";
import { useContactUsAPI } from "@/services/homeService";
import { Link } from "react-router-dom";
import UpdateSkeleton from "./skeleton/UpdateSkeleton";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa";

function Footer() {
  const { t } = useTranslation();
  const { data } = useContactUsAPI();
  const contactUs = data?.data?.data?.contact_us;
  return (
    <footer className="pt-5 bg-[#FAFAFA]">
      <div className="px-10 max-w-screen-2xl mx-auto pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-10 lg:gap-5 py-5">
          <div className="flex flex-col gap-5">
            <div className="w-[40%]">
              <Image
                imageUrl="/images/Trent-blue.svg"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-dark font-medium">{t("trent_footer_desc")}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-lg">{t("company")}</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/privacy-policy"
                className="hover:underline"
              >
                {t("privacy_policy")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/confidence-booking"
                className="hover:underline"
              >
                {t("confidence_booking")}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-lg">{t("guidelines")}</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/content-guidelines"
                className="hover:underline"
              >
                {t("content_guidelines")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/listing-guidelines"
                className="hover:underline"
              >
                {t("listing_guideLines")}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-lg">{t("stay_informed")}</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/guest-terms"
                className="hover:underline"
              >
                {t("guest_terms")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/guest-cancellation-policies"
                className="hover:underline"
              >
                {t("guest_cancellation_policies")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/host-terms"
                className="hover:underline"
              >
                {t("host_terms")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/host-cancellation-policy"
                className="hover:underline"
              >
                {t("host_cancellation_policy")}
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-bold text-lg">{t("contact_us")}</h2>
            <div className="flex flex-col gap-2 font-medium" dir="ltr">
              {!contactUs ? (
                <UpdateSkeleton cards={2} />
              ) : (
                <>
                  <Link
                    to={`mailto:${contactUs?.email}`}
                    className="hover:underline flex gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail size={25} className="text-primary" />
                    <span className="text-dark">{contactUs?.email}</span>
                  </Link>
                  <Link
                    to={`https://wa.me/${contactUs?.mobile.replace("+", "")}`}
                    className="hover:underline rtl:text-end flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={25} className="text-primary" />
                    <span className="text-dark">{contactUs?.mobile}</span>
                  </Link>
                </>
              )}
              <div className="text-primary flex gap-2" dir="ltr">
                <Link
                  to="https://www.facebook.com/share/1A9yo4Vaty/?mibextid=wwXIfr"
                  className="hover:underline flex gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={25} />
                </Link>
                <Link
                  to="https://www.instagram.com/trent.com.eg?igsh=aXJhY2MwOXZxYjd0"
                  className="hover:underline flex gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={25} />
                </Link>
                <Link
                  to="https://www.tiktok.com/@trent.com.eg?_t=ZS-8vdEjhYeOzi&_r=1"
                  className="hover:underline flex gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok size={25} />
                </Link>
                <Link
                  to="https://snapchat.com/t/Rr8O4bls"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSnapchat size={25} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary py-2 flex justify-center items-center">
        <p className="text-white font-medium text-center">
          {t("catalyst_footer_text")}{" "}
          <Link
            to="https://catalyst.com.eg/en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t("catalyst_footer_brand")}
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
