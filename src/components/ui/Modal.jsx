// components/ui/Modal.jsx

import React from 'react';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showCloseButton = true,
  size = 'medium',
  footer = null 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    fullWidth: 'max-w-7xl'
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`bg-lightBeige w-full ${sizeClasses[size]} rounded-xl shadow-2xl`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="bg-darkRed text-white p-4 md:p-6 flex justify-between items-center rounded-t-xl">
            {title && <h3 className="text-2xl font-oldstyle italic">{title}</h3>}
            {showCloseButton && (
              <button 
                onClick={onClose}
                className="p-2 hover:bg-lightRed rounded-full transition-colors"
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 md:p-6 bg-white border-t border-gray-200 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;