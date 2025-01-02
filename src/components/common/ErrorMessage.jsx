// components/common/ErrorMessage.jsx

import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-6 p-3 bg-red-50 border-l-4 border-darkRed text-darkRed font-oldstyle">
      {message}
    </div>
  );
};

export default ErrorMessage;