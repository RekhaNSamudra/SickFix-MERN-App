import { NavLink } from "react-router-dom";

const SidebarItem = ({ token, navLinks }) => {
  if (!token) return null;

  return (
    <ul className="text-[#515151] mt-5">
      {navLinks.map(({ to, icon, label }) => (
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
          key={label}
          to={to}
        >
          <img src={icon} alt="" />
          <p className="hidden md:block">{label}</p>
        </NavLink>
      ))}
    </ul>
  );
};
export default SidebarItem