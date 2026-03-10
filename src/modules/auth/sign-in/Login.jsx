import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { KeenIcon } from "@/components";
import { useLayout } from "@/providers";
import useLogin from "./useLogin";
import { Alert } from "@/components"; // Assuming Alert is your custom alert component

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin();
  };

  return (
    <div className="card max-w-[390px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-2.5">
          <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
            Sign in
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="border-t border-gray-200 w-full"></span>
          <span className="text-2xs text-gray-500 font-medium uppercase">
            Smart WebSite
          </span>
          <span className="border-t border-gray-200 w-full"></span>
        </div>

        {/* Display error alert if error exists */}
        {error && <Alert variant="danger">{error.data?.message}</Alert>}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Email</label>
          <label className="input">
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <label className="form-label text-gray-900">Password</label>
            {/* <Link
              to={
                currentLayout?.name === "auth-branded"
                  ? "/auth/reset-password"
                  : "/auth/classic/reset-password"
              }
              className="text-2sm link shrink-0"
            >
              Forgot Password?
            </Link> */}
          </div>
          <label className="input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon
                icon="eye"
                className={clsx("text-gray-500", { hidden: showPassword })}
              />
              <KeenIcon
                icon="eye-slash"
                className={clsx("text-gray-500", { hidden: !showPassword })}
              />
            </button>
          </label>
        </div>

        <label className="checkbox-group">
          <input className="checkbox checkbox-sm" type="checkbox" />
          <span className="checkbox-label">Remember me</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary flex justify-center grow"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export { Login };
