import { Navigate, Route, Routes } from "react-router";
import { AuthBrandedLayout } from "@/layouts/auth-branded";
import { Login } from "../modules/auth/sign-in/Login";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthBrandedLayout />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>
  </Routes>
);
export { AuthPage };
