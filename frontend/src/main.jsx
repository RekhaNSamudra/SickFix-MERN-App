import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContextProvider from "./Context/AppContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  // </StrictMode>
);
