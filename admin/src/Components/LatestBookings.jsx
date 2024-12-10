import React from "react";
import { assets } from "../assets/assets_admin/assets";

const LatestBookings = ({
  bookings,
  cancelAppointment,
  completeAppointment,
  isDoctorView = false,
}) => {
  return (
    <>
      <div className="bg-white w-[250px] sm:w-[650px]">
        <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold"> Latest Bookings</p>
        </div>
      </div>
      <div className="pt-10 border border-t-0  w-[250px] sm:w-[650px]">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-200"
          >
            <img
              className="rounded-full w-10"
              src={isDoctorView ? item.userData.image : item.docData.image}
              alt=""
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">
                {isDoctorView ? item.userData.name : item.docData.name}
              </p>
              <p className="text-gray-600">{item.slotDate}</p>
            </div>

            {item.cancelled ? (
              <p className="text-red-500 text-sm font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-xs font-medium text-green-500">Completed</p>
            ) : (
              <div className="flex">
                {!isDoctorView && (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
                {isDoctorView && !item.isCompleted && (
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestBookings;
