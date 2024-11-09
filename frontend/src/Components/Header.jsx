import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <>
      {/*  ----- left side ----- */}
      <div className="flex flex-col md:flex-row flex-wrap bg-green-400 rounded-lg px-6 md:px-10 lg:px-20 my-5 mx-32">
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight">
            Book Appointment <br />
            With <span className="text-primary">Trusted</span> Doctors
          </p>
          <div className="text-white flex flex-col md:flex-row items-center gap-3 text-sm font-light">
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p>
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden sm:block" />
              schedule your appointment hassle-free.
            </p>
          </div>
          <a
            href="#speciality"
            className="flex gap-2 justify-center bg-white text-gray-600 rounded-full px-8 py-3 w-60 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            <span className="text-primary font-medium">Book appointment </span>
            <img className="w-4" src={assets.arrow_icon} alt="" />
          </a>
        </div>
        {/* ----- right side ----- */}
        <div className="md:w-1/2 relative">
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
