import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
// py-8 sm:py-10 
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary h-[250px] md:h-[450px] rounded-lg mx-12 sm:mx-24 md:mx-28 lg:mx-32  px-6 sm:px-10 md:px-12 lg:px-14 my-20">
      {/* left side */}
      <div className="flex flex-col items-center justify-center md:flex-1 md:py-16 lg:py-24 lg:pl-5 ml-5">
        <div className="text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold">
          <p>Book Appointment</p>
          <p className="mt-6 md:mt-10">
            {" "}
            With 100+ <span className="text-green-500">Trusted </span>Doctors
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          <span className="text-green-500">Create account</span>
        </button>
      </div>

      {/* right side */}
      <div className="hidden md:block relative md:w-1/2 lg:w-[370px]">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
