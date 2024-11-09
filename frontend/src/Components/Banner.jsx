import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary h-[450px] rounded-lg mx-32 px-6 sm:px-10 md:px-12 lg:px-14 my-20">
      {/* left side */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold">
          <p>Book Appointment</p>
          <p className="mt-10"> With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>
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
