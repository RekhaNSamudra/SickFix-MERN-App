import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // Initialize aToken from localStorage or fallback to an empty string if no token is found
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);

  // Vite uses import.meta.env for environment variables instead of the Node.js process.env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Fetch doctors when the aToken changes or is available
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{ aToken, setAToken, backendUrl, doctors, changeAvailability}}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
