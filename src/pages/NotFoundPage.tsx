import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className=" flex items-center justify-center min-h-[50vh]">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-primary text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center  md:text-3xl">
              <span className="text-red-500">Oops!</span>{" "}
              <span>Page not found</span>
            </p>
            <p className="mb-8 text-center md:text-lg">
              The page you’re looking for doesn’t exist
            </p>
            <Link
              to={"/"}
              className="inline-block bg-primary p-2 font-medium text-white rounded-md"
              reloadDocument
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
