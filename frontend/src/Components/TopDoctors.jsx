import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import DocCard from "./DocCard";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors, getDoctorsData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 mx-12 sm:mx-24 md:mx-28 lg:mx-32 my-8 text-gray-900">
      <h1 className="text-xl sm:text-3xl sm:font-medium">
        Top Doctors to Book
      </h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-8 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <DocCard item={item} key={index} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 border border-blue-200 text-gray-600 px-12 py-3 mt-10 rounded-full"
      >
        more...
      </button>
    </div>
  );
};

export default TopDoctors;
