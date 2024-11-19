import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import DocCard from "../Components/DocCard";

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [filterDoc, setFilterDoc] = useState([]);
  const [filters, setfilters] = useState(false);

  const { doctors } = useContext(AppContext);

  const navigate = useNavigate();
  const { speciality } = useParams();

  const specialties = [...new Set(doctors.map((doctor) => doctor.speciality))];

  useEffect(() => {
    const filteredDoctors = speciality
      ? doctors.filter((doc) => doc.speciality === speciality)
      : doctors;
    setFilterDoc(filteredDoctors);
    setSelectedSpecialty(speciality);
    // Reset the selected specialty when "All Doctors" is displayed
    setSelectedSpecialty(speciality || null); // Set to null if speciality is empty
  }, [doctors, speciality]);

  return (
    <div className="text-gray-600 overflow-x-hidden mx-16 sm:mx-24 md:mx-28 lg:mx-32 my-6">
      <p>Browse through the doctors specialist.</p>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className={`py-1 px-3 border sm:hidden w-[100px] mt-4 mx-auto rounded text-sm transition-all ${
            filters ? "bg-primary text-white" : ""
          }`}
          onClick={() => setfilters((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`w-full md:w-1/5 p-4 text-center ${
            filters ? "block" : "hidden sm:block"
          }`}
        >
          {specialties.map((speciality) => (
            <p
              className={`border border-gray-300 ${
                selectedSpecialty === speciality ? "bg-blue-100 text-black" : ""
              } rounded p-2 my-4 cursor-pointer`}
              key={speciality}
              onClick={() => {
                setSelectedSpecialty(speciality);
                navigate(`/doctors/${speciality}`);
              }}
            >
              {speciality}
            </p>
          ))}
          <button
            className="border border-gray-300 rounded p-2 my-4 cursor-pointer bg-red-400 text-white"
            onClick={() => {
              setFilterDoc(doctors), setSelectedSpecialty("");
            }}
          >
            Clear filters
          </button>
        </div>
        <div className="w-4/5 p-4 grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <DocCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
