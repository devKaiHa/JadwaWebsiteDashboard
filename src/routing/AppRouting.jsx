import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useLoaders } from "@/providers";
import { AppRoutingSetup } from ".";

const AppRouting = () => {
  const { setProgressBarLoader } = useLoaders();
  const [previousLocation, setPreviousLocation] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();
  const path = location.pathname.trim();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      setProgressBarLoader(true);
      setPreviousLocation(path);
      setProgressBarLoader(false);

      if (path === previousLocation) {
        setPreviousLocation("");
      }
    }
  }, [location]);

  useEffect(() => {
    if (!CSS.escape(window.location.hash)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [previousLocation]);

  return <AppRoutingSetup />;
};

export { AppRouting };
