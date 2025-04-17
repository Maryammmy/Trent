import ProtectedRoutes from "@/middleware/ProtectedRoutes";
import ChatApp from "@/pages/ChatApp";
import Property from "@/pages/property";
import Book from "@/pages/property/Book";
import ConfirmAndPay from "@/pages/property/ConfirmAndPay";
import { Route } from "react-router-dom";

export const PropertyRoutes = (
  <>
    <Route path="properties/:id" element={<Property />} />
    <Route
      path="properties/:id/book"
      element={
        <ProtectedRoutes>
          <Book />
        </ProtectedRoutes>
      }
    />
    <Route
      path="properties/:id/confirm-and-pay"
      element={
        <ProtectedRoutes>
          <ConfirmAndPay />
        </ProtectedRoutes>
      }
    />
    <Route
      path="chat"
      element={
        <ProtectedRoutes>
          <ChatApp />
        </ProtectedRoutes>
      }
    />
  </>
);
