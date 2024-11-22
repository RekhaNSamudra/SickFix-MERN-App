import { useState, createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {
  // Initialize aToken from localStorage or fallback to an empty string if no token is found
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  // Vite uses import.meta.env for environment variables instead of the Node.js process.env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <AdminContext.Provider value={{ aToken, setAToken, backendUrl }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
