import React from 'react'

const InfoCard = ({ title, value }) => (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-full py-4 px-6 shadow-lg">
      <p className="text-white text-sm font-semibold">{title}</p>
      <p className="text-white text-lg font-light mt-1">{value}</p>
    </div>
  )

export default InfoCard
