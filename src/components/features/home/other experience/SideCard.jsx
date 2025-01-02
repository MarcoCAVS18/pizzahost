// src/features/home/other experience/SideCard.jsx

import React from "react";

const SideCard = ({ image, title, subtitle, description }) => {
  return (
    <div className="bg-lightRed shadow-lg p-6 text-center h-96 w-full sm:w-72 mx-auto flex flex-col justify-between rounded-lg">
      <img src={image} alt={title} className="w-28 h-28 mx-auto mb-6 object-cover rounded-full" />
      <h3 className="text-white font-oldstyle font-bold text-2xl mb-2">{title}</h3>
      <p className="text-beige font-oldstyle font-semibold text-lg">{subtitle}</p>
      <p className="text-beige font-oldstyle text-sm mt-4">{description}</p>
    </div>
  );
};

export default SideCard;
