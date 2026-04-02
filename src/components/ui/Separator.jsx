// components/common/Separator.jsx

import React from 'react';

const Separator = ({ text, orientation = 'horizontal' }) => {
  const isVertical = orientation === 'vertical';
  
  if (isVertical) {
    return (
      <div className="relative mx-8 h-full">
        <div className="absolute top-0 bottom-0 w-[1px] bg-gray-300" />
        {text && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="px-2 bg-beige text-gray-500 rotate-90 block select-none">
              {text}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      {text && (
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-beige text-gray-500 select-none">
            {text}
          </span>
        </div>
      )}
    </div>
  );
};

export default Separator;