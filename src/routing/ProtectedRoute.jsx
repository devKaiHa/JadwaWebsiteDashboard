import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../rtk/UsersApi/usersApi";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
