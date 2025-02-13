import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBg } from "../store/features/navbar/navbarSlice";

const useNavbarBg = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBg = () => {
      if (window.scrollY > 200) {
        dispatch(setBg(true));
      } else {
        dispatch(setBg(false));
      }
    };
    window.addEventListener("scroll", handleBg);
    return () => {
      window.removeEventListener("scroll", handleBg);
    };
  }, [dispatch]);
};

export default useNavbarBg;
