import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import DashboardCard from "../../Components/DashboardCard";
import LatestBookings from "../../Components/LatestBookings";

const Dashboard = () => {
  const { cancelAppointments, aToken, dashboardData, getDashboardData, loading } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!dashboardData) {
    return <div>No data available</div>; // Handle case if no data is available
  }


  const cards = [
    {
      icon: assets.doctor_icon,
      value: dashboardData?.doctors,
      label: "Doctors",
    },
    {
      icon: assets.appointments_icon,
      value: dashboardData?.appointments,
      label: "Appointments",
    },
    {
      icon: assets.patients_icon,
      value: dashboardData?.patients,
      label: "Patients",
    },
  ];

  return (
    dashboardData && (
      <div className="w-full m-5">
        <div className="flex flex-wrap gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        <LatestBookings
          bookings={dashboardData.latestAppointments}
          cancelAppointment={cancelAppointments} // Pass the complete function
          isDoctorView={false} // Indicate this is the Doctor view
        />
      </div>
    )
  );
};

export default Dashboard;
