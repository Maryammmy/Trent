import { useGetData } from "../../hooks/useGetData";
import { IWhyChooseUs } from "../../interfaces/landingInterface";
import { baseURL } from "../../services";
import { CurrentLanguage } from "../../types";
import ChooseUsSkeleton from "../skeleton/ChooseUsSkeleton";
import Image from "../ui/Image";

const currentLanguage = (localStorage.getItem("i18nextLng") ||
  "en") as CurrentLanguage;
function ChooseUs() {
  const { data } = useGetData(
    ["whyChooseUs"],
    `user_api/u_why_choose_us.php?lang=${currentLanguage}`
  );
  const whyChooseUsList: IWhyChooseUs[] = data?.data?.data?.why_choose_us_list;
  return (
    <div className="px-5 2xl:px-0 max-w-screen-xl mx-auto py-10">
      <div
        className="flex justify-center items-center gap-4"
        data-aos="fade-up"
      >
        <h2 className="text-lg md:text-4xl font-bold">Why You Should Choose</h2>
        <div className="w-10 h-10">
          <Image
            imageUrl="/images/Trent-tilted.svg"
            className="w-full h-full object-cover"
            alt="logo"
          />
        </div>
      </div>
      <p
        className="text-dark max-w-3xl mx-auto text-center pt-5"
        data-aos="fade-down"
      >
        You should choose us because we provide the best accommodation and we
        have sorted all the hotels here based on their quality.
      </p>
      <div
        className="flex flex-wrap gap-10 justify-evenly pt-10"
        data-aos="fade-down"
      >
        {!whyChooseUsList ? (
          <ChooseUsSkeleton cards={5} />
        ) : whyChooseUsList?.length ? (
          whyChooseUsList?.map((item, index) => {
            const { background_color, description, img } = item;
            return (
              <div
                key={index}
                style={{ backgroundColor: background_color }}
                className="h-40 w-40 zoom overflow-hidden flex flex-col gap-2 justify-center items-center rounded-full"
              >
                <div className="w-[25%]">
                  <Image
                    imageUrl={baseURL + img}
                    alt={`image ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-center text-sm text-dark font-medium px-2">
                    {description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-[50vh] text-dark font-medium w-full">
            No why choose us found
          </div>
        )}
      </div>
    </div>
  );
}

export default ChooseUs;
