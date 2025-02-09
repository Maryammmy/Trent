import HomeSearch from "../components/home/HomeSearch";
import sahel from "../assets/iamges/yalaSahel.svg";
import Image from "../components/ui/Image";
import Button from "../components/ui/Button";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <div>
      <div className="bg-home h-[50vh] bg-[length:100%_100%] bg-no-repeat">
        <Navbar />
        <div className="max-w-lg absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-6xl font-bold text-white">
            Book your next adventure
            <span className="text-secondary lobster-regular">Today</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center h-screen">
          <HomeSearch />
        </div>
        <div className="max-w-lg absolute top-[80%] left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            <Image
              className="w-full h-full object-cover"
              imageUrl={sahel}
              alt="sahel"
            />
          </div>
          <div className="flex justify-center items-center">
            <Button className="bg-primary text-white py-2 px-6 text-lg rounded-md mt-5">
              <span>check Out!</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-home2 h-[50vh] bg-cover bg-no-repeat"></div>
    </div>
  );
}

export default Home;
