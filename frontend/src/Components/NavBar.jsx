import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between text-sm border-b border-b-gray-400 pt-4 mb-1 mx-32">
        <img
          src={assets.logo}
          alt="sickfix logo"
          className="w-44 cursor-pointer"
        />
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
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="rounded-full w-12"
                src={assets.profile_pic}
                alt="my profile"
              />
              <img
                className="w-3"
                src={assets.dropdown_icon}
                alt="dropdown icon"
              />
              <div className="absolute top-6 right-0 pt-4 text-base font-medium text-gray-600 z-20 hidden group-hover:block mt-5">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("my-profile")}
                    className="hover:text-black font-medium"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black font-medium"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => setToken(false)}
                    className="hover:text-black font-medium"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white rounded-full p-3 font-medium hidden md:block"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
