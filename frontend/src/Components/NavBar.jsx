import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import NavItem from "./NavItem";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  // const [token, setToken] = useState(true);// this token is for temporary use...
  const { token, setToken, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const navMenu = [
    { path: "/", navItem: "Home" },
    { path: "/doctors", navItem: "All Doctors" },
    { path: "/about", navItem: "About" },
    { path: "/contact", navItem: "Contact" },
  ];

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <div className="sticky bg-white top-0 left-0 w-full py-4 z-50">
      <div className="mx-12 sm:mx-24 md:mx-28 lg:mx-32 flex flex-row items-center justify-between">
        <img
          onClickCapture={() => navigate("/")}
          src={assets.logo}
          alt="sickfix logo"
          className="w-20 sm:w-32 md:w-44 lg:w-44 cursor-pointer"
        />

        {/* nav menu items */}
        <ul
          className={`flex-col md:flex md:flex-row md:gap-6 ${
            showMenu
              ? "block md:hidden bg-stone-200 z-50 absolute top-12 mt-8 right-12 rounded p-4 w-[200px]"
              : "hidden"
          }`}
        >
          {navMenu.map((item, index) => (
            <NavItem key={index} path={item.path} navItem={item.navItem} />
          ))}
        </ul>

        {/* profile account */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="rounded-full w-12"
                // src={assets.profile_pic}
                src={userData.image}
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
                    // onClick={() => setToken(false)}
                    onClick={logout}
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
              className="bg-primary hidden md:block text-white rounded-full p-1 px-2 sm:p-3 text-sm font-normal sm:font-medium"
            >
              Create Account
            </button>
          )}
        </div>

        {/* ------ mobile view  menu ----- */}
        <div
          className="w-6 md:hidden cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={showMenu ? assets.cross_icon : assets.menu_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
