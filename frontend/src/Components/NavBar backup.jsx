import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import NavItem from "./NavItem";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();

  const navMenu = [
    { path: "/", navItem: "Home" },
    { path: "/doctors", navItem: "All Doctors" },
    { path: "/about", navItem: "About" },
    { path: "/contact", navItem: "Contact" },
  ];

  return (
    <>
      <div className="flex items-center justify-between text-sm border-b border-b-gray-400 pt-4 mb-1 mx-12 sm:mx-24 md:mx-28 lg:mx-32">
        <img
          onClickCapture={() => navigate("/")}
          src={assets.logo}
          alt="sickfix logo"
          className="w-20 sm:w-32 md:w-44 lg:w-44 cursor-pointer"
        />

        <ul className="hidden md:flex items-center gap-5 font-medium text-lg">
          {navMenu.map((item, index) => (
            <NavItem key={index} path={item.path} navItem={item.navItem} />
          ))}
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
          <img
            className="w-6 md:hidden cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
            src={assets.menu_icon}
            alt=""
          />
        </div>
       
      </div>
      <div className="mx-12 sm:mx-24 md:mx-28 lg:mx-32 h-full sm:hidden md:hidden lg:hidden">
        {showMenu && (
          <div className="fixed inset-0 top-20 bg-stone-100 z-10 p-6">
            <img
              className="w-6 absolute top-10 right-10"
              src={assets.cross_icon}
              alt=""
              onClick={() => setShowMenu(false)}
            />
            <div>
              <ul className="flex flex-col items-start gap-5 font-medium text-lg">
                {navMenu.map((item, index) => (
                  <NavItem
                    key={index}
                    path={item.path}
                    navItem={item.navItem}
                    onClick={() => setShowMenu(false)}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
     
    </>
  );
};

export default NavBar;




   {/* <ul
          className={`md:flex items-center gap-5 font-medium text-lg ${
            showMenu
              ? "absolute top-16 right-0 m-5 w-[200px] p-4 gap-4 bg-stone-100 rounded-b-lg shadow-md z-10 flex-col"
              : "hidden"
          } md:block`} 
        > */}