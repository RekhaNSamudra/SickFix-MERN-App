import React from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between text-sm border-b border-b-gray-400 pt-4 mb-1 mx-16">
        <img src={logo} alt="sickfix logo" className="w-44 cursor-pointer" />
        <ul className="hidden md:flex items-center gap-5 font-medium">
          <NavLink to={"/"}>
            <li>Home</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden mt-1" />
          </NavLink>
          <NavLink to={"/doctors"}>
            <li>All Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden mt-1" />
          </NavLink>
          <NavLink to={"/about"}>
            <li>About</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden mt-1" />
          </NavLink>
          <NavLink to={"/contact"}>
            <li>Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/4 m-auto hidden mt-1" />
          </NavLink>
        </ul>
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white rounded-full p-3 font-medium hidden md:block"
        >
          Create Account
        </button>
      </div>
    </>
  );
};

export default NavBar;
