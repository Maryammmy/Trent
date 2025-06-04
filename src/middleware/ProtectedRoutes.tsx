import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setIsloggedin } from "../store/features/auth/authSlice";
import { uid } from "@/constants";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  if (!uid) {
    dispatch(setIsloggedin(true));
    return <Navigate to="/" state={location.pathname} replace />;
  }
  return children;
}
