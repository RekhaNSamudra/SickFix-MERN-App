import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import DocCard from "../Components/DocCard";

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [filterDoc, setFilterDoc] = useState([]);

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
    <div className="text-gray-600 mx-32 my-6">
      <p>Browse through the doctors specialist.</p>
      <div className="flex">
        <div className="w-1/5 p-4 ">
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
