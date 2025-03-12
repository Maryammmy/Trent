import { aboutInfo } from "../../data/aboutData";
import Image from "../ui/Image";

function AboutInfo() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
      <div className=" w-full h-[400px] md:w-[500px] lg:w-[400px] rounded-md overflow-hidden">
        <Image
          imageUrl="/images/home1.avif"
          alt="home"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-[500px]">
        <h2 className="text-3xl font-bold"> This is Trent</h2>
        <p className="text-dark font-semibold py-4">
          We believe that travel has the power to transform lives and bring
          people closer together.
        </p>
        <div className="flex flex-col gap-4">
          {aboutInfo.map((item, index) => {
            const { text, title } = item;
            return (
              <div key={index}>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-dark">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
