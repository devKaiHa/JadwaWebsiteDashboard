import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove cookies set during login
    Cookies.remove("Token");

    // Optionally clear state or localStorage if used
    localStorage.clear();

    // Redirect to login or home
    navigate("/auth/login");
  };

  return { logout };
};

export default useLogout;
