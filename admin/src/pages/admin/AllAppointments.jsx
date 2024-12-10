import React from "react";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointments } =
    useContext(AdminContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, appointments]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm overflow-y-scroll max-h-[80vh] min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_3fr_3fr_1fr_2fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.slice().reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between items-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2.5fr_3fr_3fr_1fr_2fr] text-gray-500 border-b px-6 py-3 hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p>
              {item.slotTime}, &nbsp;{item.slotDate}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-300"
                src={item.docData.image}
                alt=""
              />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-500 text-sm font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-sm font-medium">Completed</p>
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
  );
};

export default AllAppointments;
