import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Speciality </h1>
      <p className="w-1/3 text-sm text-center">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex flex-wrap sm:justify-center overflow-scroll gap-8 pt-5 w-full">
        {specialityData.map((item, index) => (
          <div key={index} className="flex sm:flex-col">
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              to={`/doctors/${item.speciality}`}
            >
              <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
              <p>{item.speciality}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
