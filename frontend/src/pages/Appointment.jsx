import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets_frontend/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  // Find the doctor with the matching ID
  const doctor = doctors.find((doc) => doc._id === docId);

  return (
    doctor && (
      <div className=" mx-32">
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={doctor.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0 sm:mt-0 mt-[-80px]">
            <p className="flex items-center gap-2 text-gray-900 text-2xl font-medium">
              {doctor.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <p>
                {doctor.degree} - {doctor.speciality}
              </p>
              <button className="border rounded-full py-0.5 px-2 text-xs ">
                {doctor.experience}
              </button>
            </div>
            <div>
              <p className="text-gray-900 text-lg mt-3 font-medium">About</p>
              <p className="text-gray-600 text-sm max-w-[700px] mt-1">
                {doctor.about}
              </p>
            </div>
            <p className="text-gray-500 mt-4 font-medium">
              Appointment fee:
              <span className="text-gray-700">
                {currencySymbol}
                {doctor.fees}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
