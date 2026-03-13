import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove Token cookies
    Cookies.remove("Token");

    // Clear localStorage
    localStorage.clear();

    // Redirect to login
    navigate("/auth/login");
  };

  return { logout };
};

export default useLogout;
