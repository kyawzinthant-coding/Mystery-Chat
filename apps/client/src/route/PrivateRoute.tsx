import { Navigate, Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";

const PrivateRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};

export default PrivateRoute;
