import React from 'react'

const DashboardCard = ({ icon, value, label }) => (
  <div className="flex gap-2 items-center p-4 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={icon} alt={label} />
    <div>
      <p className="text-xl font-semibold text-gray-600">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

export default DashboardCard