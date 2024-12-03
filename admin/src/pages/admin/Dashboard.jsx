import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import DashboardCard from "../../Components/DashboardCard";

const Dashboard = () => {
  const { aToken, getDashboardData, cancelAppointments, dashboardData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  const cards = [
    {
      icon: assets.doctor_icon,
      value: dashboardData.doctors,
      label: "Doctors",
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

        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold"> Latest Bookings</p>
          </div>
        </div>

        <div className="pt-10 border border-t-0">
          {dashboardData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-200"
            >
              <img
                className="rounded-full w-10 "
                src={item.docData.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {item.docData.name}{" "}
                </p>
                <p className="text-gray-600">{item.slotDate}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-500 text-sm font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointments(item._id)}
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
