import HomeSearch from "../components/home/HomeSearch";
import Image from "../components/ui/Image";
import Navbar from "../components/Navbar";
import Carsoul from "../components/ui/Carsoul";
import place1 from "../assets/iamges/place1.png";
import place2 from "../assets/iamges/place2.png";
import place3 from "../assets/iamges/place3.png";
import place4 from "../assets/iamges/place4.png";
import { responsiveHomeSearch } from "../data/categoryBar";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

function Home() {
  const bgImages: string[] = [place1, place2, place3, place4];
  return (
    <>
      <div>
        <div className="bg-home h-[50vh] bg-[length:100%_100%] bg-no-repeat mb-10 lg:mb-20">
          <Navbar />
          <div className="w-full px-5 md:max-w-xl absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl md:text-6xl font-bold text-white">
              Book your next adventure
              <span className="text-secondary">Today</span>
            </h1>
          </div>
          <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <HomeSearch />
          </div>
        </div>
        <Carsoul
          showDot={false}
          showArrow={true}
          infinite={true}
          autoplay={true}
          slidesToShow={4}
          responsive={responsiveHomeSearch}
          padding="5px"
        >
          {bgImages.map((item: string, index: number) => (
            <div key={index} className="h-[40vh] w-full px-4">
              <Image
                alt="slider"
                imageUrl={item}
                key={index}
                className="w-full h-full"
              />
            </div>
          ))}
        </Carsoul>
      </div>
      <LoginModal />
      <SignupModal />
    </>
  );
}

export default Home;
