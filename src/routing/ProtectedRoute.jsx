import { Navigate, Outlet } from "react-router-dom";

const checkToken = () => {
  const token = sessionStorage.getItem("Token");
  return token ? true: false;
};

const ProtectedRoute = ({ redirectTo }) => {
  if (!checkToken()) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
