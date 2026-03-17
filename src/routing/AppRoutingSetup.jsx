import ProtectedRoute from "./ProtectedRoute";
import { Navigate, Route, Routes } from "react-router";

import { Demo6Layout } from "@/layouts/demo6";
import { ErrorsRouting } from "@/errors";
import { AuthPage } from "../auth/AuthPage";
import { Demo4Page } from "../pages/dashboards/demo4";
import NewsList from "../modules/News/News/NewsList";
import AddNews from "../modules/News/News/AddNews";
import NewsCategoriesList from "../modules/News/NewsCategories/NewsCategoriesList";
import EditNews from "../modules/News/News/EditNews";
import Settings from "../modules/Settings/Settings";
import ContactsList from "../modules/Contact/components/ContactsList";
import JobsList from "../modules/Jobs/JobsList";
import ApplicationsList from "../modules/Jobs/ApplicationsList";
import AddJob from "../modules/Jobs/AddJob";
import EditJob from "../modules/Jobs/EditJob";

const AppRoutingSetup = () => {
  return (
    <Routes>
      {/*  ProtectedRoute */}
      <Route element={<ProtectedRoute redirectTo="/auth/login" />}>
        <Route element={<Demo6Layout />}>
          <Route path="/" element={<Demo4Page />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/add-news" element={<AddNews />} />
          <Route path="/news/edit-news/:id" element={<EditNews />} />
          <Route
            path="/news/news-categories"
            element={<NewsCategoriesList />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<ContactsList />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/jobs/add-job" element={<AddJob />} />
          <Route path="/jobs/edit-job/:id" element={<EditJob />} />
          <Route path="/job-applications" element={<ApplicationsList />} />
        </Route>
      </Route>

      {/* General pages */}
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
