import logo from "../../assets/iamges/Trent.svg";
import { chooseUs } from "../../data/landingData";
import { useGetData } from "../../hooks/useGetData";
import { IWhyChooseUs } from "../../interfaces/landingInterface";
import Image from "../ui/Image";

const currentLanguage = localStorage.getItem("i18nextLng");
function ChooseUs() {
  const { data } = useGetData(
    ["whyChooseUs"],
    `user_api/u_why_choose_us.php?lang=${currentLanguage}`
  );
  const whyChooseUs: IWhyChooseUs[] = data?.data?.why_choose_us;
  console.log(whyChooseUs);
  return (
    <div className="px-5 2xl:px-0 max-w-screen-xl mx-auto py-10">
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-lg md:text-4xl font-bold">Why You Should Choose</h2>
        <div className="w-10 h-10">
          <Image
            imageUrl={logo}
            className="w-full h-full object-cover"
            alt="logo"
          />
        </div>
      </div>
      <p className="text-dark max-w-3xl mx-auto text-center pt-5">
        You should choose us because we provide the best accommodation and we
        have sorted all the hotels here based on their quality.
      </p>
      <div className="flex flex-wrap gap-5 justify-evenly pt-10">
        {chooseUs.map((item, index) => {
          const { title, icon } = item;
          return (
            <div
              key={index}
              className="h-40 w-40 zoom overflow-hidden flex flex-col gap-2 justify-center items-center rounded-full bg-primary"
            >
              {typeof icon === "string" ? (
                <div className="w-[25%]">
                  <Image
                    imageUrl={icon}
                    alt={`image ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div>{icon}</div>
              )}
              <div className="flex items-center justify-center">
                <p className="text-center text-sm text-white font-medium px-2">
                  {title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseUs;
