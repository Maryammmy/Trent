import { Outlet } from "react-router-dom";
import Header from "../components/becomeAHost/Header";
import useCheckForLostFiles from "../hooks/useCheckForLostFiles";

function BecomeAHostLayout() {
  useCheckForLostFiles();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default BecomeAHostLayout;
