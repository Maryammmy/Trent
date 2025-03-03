import AboutInfo from "../components/aboutUs/AboutInfo";

function AboutUs() {
  return (
    <div>
      <div className="bg-about-us bg-no-repeat bg-fixed bg-[length:100%_100%] h-[50vh] w-full">
        <div className="flex items-center h-full">
          <div className="md:border-2 md:*:border-white max-w-[500px] md:ms-20  lg:ms-40 p-4">
            <h2 className="text-4xl font-bold text-white py-2">About Us</h2>
            <p className="text-white py-2">
              We help travelers discover one-of-a-kind accommodations and
              experiences by connecting them with trusted hosts worldwide. From
              charming apartments in bustling cities to serene villas tucked
              away in nature, we make it easy to find a place that suits your
              style and budget.
            </p>
          </div>
        </div>
      </div>
      <div className="py-10 px-5 xl:px-20">
        <AboutInfo />
      </div>
    </div>
  );
}

export default AboutUs;
