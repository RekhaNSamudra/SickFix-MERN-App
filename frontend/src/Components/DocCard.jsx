import React from "react";
import { useNavigate } from "react-router-dom";

const DocCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/appointment/${item._id}`), scrollTo(0, 0);
        }}
        className="border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 h-auto"
      >
        <img className="bg-blue-50" src={item.image} alt="" />
        <div className="p-4">
          <div
            className={`flex items-center gap-2 text-sm ${
              item.available ? "text-green-500" : "text-gray-500"
            }`}
          >
            <p
              className={`w-2 h-2 rounded-full ${
                item.available ? "bg-green-500" : "bg-gray-500"
              }`}
            ></p>
            <p>{item.available ? "Available" : "Not Available"}</p>
          </div>

          <p className="text-gray-900 text-lg font-medium text-start">
            {item.name}
          </p>
          <p className="text-gray-600 text-sm text-start">{item.speciality}</p>
        </div>
      </div>
    </>
  );
};

export default DocCard;
