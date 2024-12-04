import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import SidebarItem from "./SidebarItem";
import { assets } from "../assets/assets_admin/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navLinksAdmin = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
    { to: "/doctors-list", icon: assets.people_icon, label: "Doctors List" },
  ];

  const navLinksDoctor = [
    { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/doctor-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/doctor-profile", icon: assets.people_icon, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-white border-r">
      <SidebarItem token={aToken} navLinks={navLinksAdmin} />
      <SidebarItem token={dToken} navLinks={navLinksDoctor} />
    </div>
  );
};

export default Sidebar;
