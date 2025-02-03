import { Link } from "react-router-dom";
import PrograssBar from "../../components/ui/PrograssBar";
import { getStartedToHost } from "../../data/hosting";

function GetStartedToHost() {
  return (
    <div className="py-10">
      <div className="flex items-center justify-between hosting-layout max-w-screen-xl mx-auto px-5 md:px-0 pb-10">
        <div>
          <h2 className="text-[70px] font-bold max-w-2xl">
            It’s easy to get started on Trent
          </h2>
        </div>
        <div>
          {getStartedToHost.map((item, index) => {
            const { title, desc } = item;
            return (
              <div key={index} className="flex gap-3 mb-4">
                <div>
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{title}</h2>
                  <p className="text-secondary font-medium text-lg max-w-lg">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <PrograssBar width="0px" />
      <div className="flex justify-end">
        <Link
          to="/hosting/choose-place"
          className="py-2 px-5 font-medium bg-primary text-white text-lg rounded-md mt-4 me-4"
        >
          <span>Get started</span>
        </Link>
      </div>
    </div>
  );
}

export default GetStartedToHost;
