import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div className="mx-16 sm:mx-24 md:mx-28 lg:mx-32 overflow-x-hidden">
      <p className="pb-3 mt-12 font-normal text-2xl text-zinc-700 border-b ">
        My Appointments
      </p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b my-4"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 mt-2 font-medium">Address:</p>
              <p>{item.address.line1}</p>
              <p>{item.address.line2}</p>
              <p className="mt-2">
                <span className="font-medium text-zinc-700">Date & Time: </span>{" "}
                25, July, 2024 | 8:30 PM
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-4 text-sm text-stone-500 text-center">
              <button className="border py-2 sm:min-w-48 hover:bg-primary hover:text-white">Pay Online</button>

              <button className="border py-2 sm:min-w-48 hover:bg-red-400 hover:text-white">Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
