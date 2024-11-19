import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";


const Layout = () => {
  return (
    <>
      {/* <NavBar /> */}
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
