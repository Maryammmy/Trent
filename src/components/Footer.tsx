import Image from "./ui/Image";
import { useContactUsAPI } from "@/services/homeService";
import { Link } from "react-router-dom";
import UpdateSkeleton from "./skeleton/UpdateSkeleton";
import { useTranslation } from "react-i18next";

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
              >
                {t("privacy_policy")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/confidence-booking"
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
              >
                {t("content_guidelines")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/listing-guidelines"
              >
                {t("listing_guideLines")}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-lg">{t("stay_informed")}</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              <Link rel="noopener noreferrer" target="_blank" to="/guest-terms">
                {t("guest_terms")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/guest-cancellation-policies"
              >
                {t("guest_cancellation_policies")}
              </Link>
              <Link rel="noopener noreferrer" target="_blank" to="/host-terms">
                {t("host_terms")}
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                to="/host-cancellation-policy"
              >
                {t("host_cancellation_policy")}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-lg">{t("contact_us")}</h2>
            <div className="flex flex-col gap-2 text-dark font-medium">
              {!contactUs ? (
                <UpdateSkeleton cards={2} />
              ) : (
                <>
                  <Link
                    to={`mailto:${contactUs?.email}`}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactUs?.email}
                  </Link>
                  <Link
                    to={`https://wa.me/${contactUs?.mobile.replace("+", "")}`}
                    className="hover:underline rtl:text-end"
                    target="_blank"
                    dir="ltr"
                    rel="noopener noreferrer"
                  >
                    {contactUs?.mobile}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary py-2 flex justify-center items-center">
        <p className="text-white font-medium text-center">
          © 2025 — Design and Develope by Catalyst
        </p>
      </div>
    </footer>
  );
}

export default Footer;
