import React from 'react';
import Button from './Button';

const Card = ({ image, title, subtitle, buttonText }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-8">
    <div className="w-72 h-72 md:w-72 md:h-64 flex-shrink-0 mx-auto md:mx-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover rounded-2xl" 
      />
    </div>
    <div className="flex-grow text-center md:text-left flex flex-col justify-between gap-6 my-4">
      <h4 className="font-serif font-semibold italic text-2xl">{title}</h4>
      <p className="text-gray-500 font-oldstyle text-xl">{subtitle}</p>
      <Button 
        text={buttonText} 
        className="bg-transparent border border-gray-700 font-oldstyle font-semibold text-gray-400 px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg mx-auto md:mx-0"
        variant='disabled'
      />
    </div>
  </div>
);

export default Card;