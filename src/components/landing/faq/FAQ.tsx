import { useGetData } from "@/hooks/useGetData";
import { IFaq } from "@/interfaces/landing";
import { CurrentLanguage } from "@/types";
import FAQItem from "./FAQItem";
import { useTranslation } from "react-i18next";
import FAQSkeleton from "@/components/skeleton/FAQSkeleton";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function FAQ() {
  const { t } = useTranslation();
  const { data } = useGetData(
    ["FAQ"],
    `user_api/u_faq.php?lang=${currentLanguage}`
  );
  const faqs: IFaq[] = data?.data?.data?.faq_list;
  return (
    <section className="bg-blue-50 px-5 xl:px-20 py-10 md:py-16 lg:py-20">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-5 lg:gap-10 xl:gap-20">
        {!faqs ? (
          <FAQSkeleton cards={2} />
        ) : faqs?.length ? (
          <>
            <div className="">
              <h2 className="text-lg md:text-3xl font-bold text-primary">
                {t("have_question_check_out")}
                <br />
                {t("the_faq")}
              </h2>
            </div>
            <div className="flex flex-col gap-5 flex-1">
              {faqs?.map((faq) => (
                <FAQItem key={faq?.id} faq={faq} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-lg h-[20vh] text-dark font-medium w-full">
            {t("no_faq_found")}
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQ;
