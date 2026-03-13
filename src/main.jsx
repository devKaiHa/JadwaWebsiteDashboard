import "@/components/keenicons/assets/styles.css";
import "./styles/globals.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ProvidersWrapper } from "./providers";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </React.StrictMode>,
);
