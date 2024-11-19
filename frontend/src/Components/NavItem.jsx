import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ path, navItem }) => {
  return (
    <div>
      <NavLink to={path} className="w-full">
        <li className="mt-2 sm:mt-0">{navItem}</li>
        <hr className="border-none outline-none h-0.5 bg-primary w-6 sm:w-3/4 sm:m-auto hidden mt-0 sm:mt-1" />
      </NavLink>
    </div>
  );
};

export default NavItem;