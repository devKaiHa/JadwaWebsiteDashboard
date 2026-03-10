// hooks/useTokenValidation.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useTokenValidation = () => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const token = Cookies.get("Token");

    if (!token || token.split(".").length !== 3) {
      setIsValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        Cookies.remove("Token");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (error) {
      Cookies.remove("Token");
      setIsValid(false);
    }
  }, []);

  return isValid;
};

export default useTokenValidation;
