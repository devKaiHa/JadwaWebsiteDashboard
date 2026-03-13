import { useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} from "../../../rtk/AuthApi/authApi";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, data }] = useLoginMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [refresh] = useRefreshMutation();

  const handleLogin = async () => {
    const formData = {
      email,
      password,
    };
    try {
      const res = await login(formData).unwrap();
      return res.data.user;
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = async () => {
    await logout().unwrap();
  };

  const refreshToken = async () => {
    try {
      await refresh().unwrap();
    } catch (error) {
      console.error("Refresh failed", error);
    }
  };

  return {
    //Login
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
    data,

    //Logout
    handleLogout,
    isLoggingOut,

    //Refresh token
    refreshToken,
  };
};

export default useLogin;
