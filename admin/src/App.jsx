import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div>
      <ToastContainer /> 
      {aToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start ">
            <Sidebar />
            <Routes >
              <Route path='/' element={<></>}/>
              <Route path='/admin-dashboard' element={<Dashboard/>}/>
              <Route path='/all-apponitments' element={<AllAppointments/>}/>
              <Route path='/add-doctor' element={<AddDoctor/>}/>
              <Route path='/doctors-list' element={<DoctorsList/>}/>
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
