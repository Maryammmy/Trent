import { Outlet } from "react-router-dom";
import Header from "../components/becomeAHost/Header";

function BecomeAHostLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default BecomeAHostLayout;
