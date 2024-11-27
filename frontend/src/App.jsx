import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* Global providers or components can go here */}
      <ToastContainer />
      <AppRoutes /> {/* Handles all routing */}
    </>
  );
};

export default App;
