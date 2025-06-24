import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthorizationCheckProps {
  owner: string;
  userId: string | undefined;
}
function AuthorizationCheck({ owner, userId }: AuthorizationCheckProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (owner && userId && userId !== owner) {
      setTimeout(() => {
        navigate("/hosting/properties");
      }, 1000);
    }
  }, [owner, userId, navigate]);

  if (owner && userId && userId !== owner) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500">
          You are not authorized to edit this property.
        </h2>
      </div>
    );
  }
}

export default AuthorizationCheck;
