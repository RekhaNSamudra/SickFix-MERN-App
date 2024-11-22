import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  const navLinks = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/all-apponitments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
    { to: "/doctors-list", icon: assets.people_icon, label: "Doctors List" },
  ];

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`} key={label} to={to}>
              <img src={icon} alt="" />
              <p>{label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
