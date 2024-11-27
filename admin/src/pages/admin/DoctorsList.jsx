import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, changeAvailability } = useContext(AdminContext);
  console.log("first", doctors)

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll ">
      <h1 className="text-lg font-medium ">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
      {doctors.map((item, index) => (
        <div className="border border-indigo-200 rounded-lg max-w-56 cursor-pointer overflow-hidden group" key={index}>
          <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-300" src={item.image} alt="" />
          <div className="p-4">
            <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
            <p className="text-zinc-500 text-sm"> {item.speciality}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={item.available} onChange={()=>changeAvailability(item._id)}/>
              <p>Available</p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default DoctorsList;
