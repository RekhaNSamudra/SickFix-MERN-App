import React from 'react'
import { useParams, useNavigate } from "react-router-dom";

const DocCard = ({item}) => {
  const navigate = useNavigate();
  return (
    <>
         <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm  text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>

                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
    </>
  )
}

export default DocCard

