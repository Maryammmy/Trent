import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShadow } from "../store/features/categoryBar/categoryBarSlice";

const useScrollShadow = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        dispatch(setShadow(true));
      } else {
        dispatch(setShadow(false));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);
};

export default useScrollShadow;
