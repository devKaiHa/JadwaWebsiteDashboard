import ProtectedRoute from "./ProtectedRoute";
import { Navigate, Route, Routes } from "react-router";
import { DefaultPage } from "@/pages/dashboards";

import { Demo6Layout } from "@/layouts/demo6";
import { ErrorsRouting } from "@/errors";
import { AuthPage } from "../auth/AuthPage";

const AppRoutingSetup = () => {
  return (
    <Routes>
      {/*  ProtectedRoute */}
      <Route element={<ProtectedRoute redirectTo="/auth/login" />}>
        <Route element={<Demo6Layout />}>
          <Route path="/" element={<DefaultPage />} />
        </Route>
      </Route>

      {/* الصفحات العامة */}
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
