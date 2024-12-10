// import { useState, createContext, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AdminContext = createContext();

// const AdminContextProvider = ({ children }) => {
//   // Initialize aToken from localStorage or fallback to an empty string if no token is found
//   const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [dashboardData, setDashboardData] = useState(null);

//   // Vite uses import.meta.env for environment variables instead of the Node.js process.env
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/all-doctors",
//         {},
//         { headers: { Authorization: `Bearer ${aToken}` } }
//       );

//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getAllAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
//         headers: { Authorization: `Bearer ${aToken}` },
//       });
//       if (data.success) {
//         setAppointments(data.appointments);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getDashboardData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
//         headers: { Authorization: `Bearer ${aToken}` },
//       });
//       if (data.success) {
//         setDashboardData(data.dashData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const cancelAppointments = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/appointment-cancel",
//         { appointmentId },
//         { headers: { Authorization: `Bearer ${aToken}` } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getAllAppointments();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {}
//   };

//   const changeAvailability = async (docId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/change-availability",
//         { docId },
//         { headers: { Authorization: `Bearer ${aToken}` } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         // Update the doctor locally without refetching the entire list
//         setDoctors((prevDoctors) =>
//           prevDoctors.map((doctor) =>
//             doctor._id === docId
//               ? { ...doctor, available: !doctor.available } // Toggle availability
//               : doctor
//           )
//         );
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//    // Fetch doctors when the aToken changes or is available
//    useEffect(() => {
//     if (aToken) {
//       getAllDoctors();
//       getDashboardData()
//       getAllAppointments()
//     }
//   }, [aToken]);

//   return (
//     <AdminContext.Provider
//       value={{
//         aToken,
//         setAToken,
//         backendUrl,
//         doctors,
//         changeAvailability,
//         appointments,
//         setAppointments,
//         getAllAppointments,
//         cancelAppointments,
//         dashboardData,
//         getDashboardData,
//       }}
//     >
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;

import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Vite uses import.meta.env for environment variables instead of the Node.js process.env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Helper function to fetch data
  const fetchData = async (url, method = "GET", data = null) => {
    setLoading(true); // Set loading to true before making the request
    try {
      const config = {
        headers: { Authorization: `Bearer ${aToken}` },
      };
      const response =
        method === "GET"
          ? await axios.get(url, config)
          : await axios.post(url, data, config);

      return response.data;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      throw error; // Let the caller handle it
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  // Fetch all doctors
  const getAllDoctors = async () => {
    const data = await fetchData(backendUrl + "/api/admin/all-doctors", "POST");
    if (data.success) {
      setDoctors(data.doctors);
    } else {
      toast.error(data.message);
    }
  };

  // Fetch all appointments
  const getAllAppointments = async () => {
    const data = await fetchData(backendUrl + "/api/admin/appointments");
    if (data.success) {
      setAppointments((prevAppointments) => [...data.appointments]); // Functional update
    } else {
      toast.error(data.message);
    }
  };

  // Fetch dashboard data
  const getDashboardData = async () => {
    const data = await fetchData(backendUrl + "/api/admin/dashboard");
    if (data.success) {
      setDashboardData(data.dashData);
    } else {
      toast.error(data.message);
    }
  };

  // Cancel appointment
  const cancelAppointments = async (appointmentId) => {
    const data = await fetchData(
      backendUrl + "/api/admin/appointment-cancel",
      "POST",
      { appointmentId }
    );
    if (data.success) {
      toast.success(data.message);
      // getAllAppointments(); // Re-fetch appointments after cancellation
      // Update appointments locally
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
    } else {
      toast.error(data.message);
    }
  };

  // Change doctor's availability
  const changeAvailability = async (docId) => {
    const data = await fetchData(
      backendUrl + "/api/admin/change-availability",
      "POST",
      { docId }
    );
    if (data.success) {
      toast.success(data.message);
      // Update doctor availability locally without refetching the entire list
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === docId
            ? { ...doctor, available: !doctor.available }
            : doctor
        )
      );
    } else {
      toast.error(data.message);
    }
  };

  // Fetch all data once the token is available
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      // getAllAppointments();
      // getDashboardData();
    }
  }, [aToken]); // Depend on `aToken` so it runs when the token changes

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        backendUrl,
        doctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointments,
        dashboardData,
        getDashboardData,
        loading
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
