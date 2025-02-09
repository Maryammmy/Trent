import HomeSearch from "../components/home/HomeSearch";

function Home() {
  return (
    <div className="">
      <div className="bg-home h-[50vh] bg-[length:100%_100%] bg-no-repeat">
        <div className="flex justify-center items-center h-screen">
          <HomeSearch />
        </div>
      </div>
      <div className="bg-home2 h-[50vh] bg-[length:100%_100%] bg-no-repeat"></div>
    </div>
  );
}

export default Home;
