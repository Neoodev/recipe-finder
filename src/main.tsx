import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "../node_modules/react-router-dom/dist/index";
import { MainContextProvider } from "./context/mainContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
