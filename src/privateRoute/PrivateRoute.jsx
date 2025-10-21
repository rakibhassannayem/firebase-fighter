import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";
import { FadeLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <FadeLoader color="violet" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/signin"} state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
