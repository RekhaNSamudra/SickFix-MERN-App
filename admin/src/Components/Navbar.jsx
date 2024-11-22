import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken(""); // Clears the authentication token from context if it exists
    aToken && localStorage.removeItem("aToken"); // Removes the authentication token from localStorage if it exists
    toast.success("Logout successful!");
  };

  return (
    <div className="flex flex-row items-center justify-between mx-20 px-4 sm:px-10 bg-white">
      <div className="flex items-center text-xs gap-2">
        <img
          className="w-20 sm:w-32 md:w-44 lg:w-44 cursor-pointer"
          src={assets.logo}
          alt=""
        />
        <p className="border rounded-full px-2.5 py-0.5 border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white rounded-full text-sm px-10 py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
