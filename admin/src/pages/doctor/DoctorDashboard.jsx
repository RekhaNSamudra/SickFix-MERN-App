import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import DashboardCard from "../../Components/DashboardCard";
import { AppContext } from "../../context/AppContext";
import LatestBookings from "../../Components/LatestBookings";

const DoctorDashboard = () => {
  const {
    dToken,
    getDashboardData,
    dashboardData,
    setDashboardData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashboardData();
    }
  }, [dToken]);

  const cards = [
    {
      icon: assets.earning_icon,
      value: currency + dashboardData.earnings,
      label: "Earnings",
    },
    {
      icon: assets.appointments_icon,
      value: dashboardData.appointments,
      label: "Appointments",
    },
    {
      icon: assets.patients_icon,
      value: dashboardData.patients,
      label: "Patients",
    },
  ];

  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        <LatestBookings
          bookings={dashboardData.latestAppointments}
          cancelAppointment={cancelAppointment} // Pass the cancel function
          completeAppointment={completeAppointment} // Pass the complete function
          isDoctorView={true} // Indicate this is the Doctor view
        />
      </div>
    )
  );
};

export default DoctorDashboard;
