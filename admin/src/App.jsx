import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div>
      <ToastContainer /> 
      {aToken || dToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start ">
            <Sidebar />
            <Routes >
              <Route path='/' element={<Login />}/>
              {/* Admin routes */}
              <Route path='/admin-dashboard' element={<Dashboard/>}/>
              <Route path='/all-appointments' element={<AllAppointments/>}/>
              <Route path='/add-doctor' element={<AddDoctor/>}/>
              <Route path='/doctors-list' element={<DoctorsList/>}/>
               {/* Doctor routes */}
               <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
               <Route path='/doctor-profile' element={<DoctorProfile/>}/>
               <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
               {/* Default fallback for authenticated users */}
              <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
     
        <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />
            {/* Redirect unauthenticated users */}
            <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      )}
    </div>
  );
};

export default App;
