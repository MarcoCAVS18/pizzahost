// components/ui/Card.jsx
import React from 'react';
import clsx from 'clsx';
import Button from './Button';

/**
 * Componente Card unificado con múltiples variantes
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del card
 * @param {string} props.variant - Variante del card ('default', 'menu', 'product', 'feature')
 * @param {string} props.image - URL de la imagen
 * @param {string} props.title - Título del card
 * @param {string} props.subtitle - Subtítulo o descripción
 * @param {string} props.buttonText - Texto del botón (si aplica)
 * @param {Function} props.onButtonClick - Función para el click del botón
 * @param {string} props.className - Clases adicionales
 */
const Card = ({ 
  children,
  variant = 'default',
  image,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  className = '',
  ...props
}) => {
  // Clases base según la variante
  const baseClasses = {
    default: "bg-white rounded-lg shadow-md overflow-hidden",
    menu: "bg-white rounded-lg shadow-md overflow-hidden",
    product: "bg-transparent rounded-3xl shadow-2xl border-2 hover:scale-105 transition-all duration-300 w-full flex flex-col",
    feature: "flex flex-col md:flex-row md:items-center gap-8"
  };

  // Renderizado según la variante
  switch (variant) {
    case 'feature':
      return (
        <div className={clsx(baseClasses[variant], className)} {...props}>
          {image && (
            <div className="w-72 h-72 md:w-72 md:h-64 flex-shrink-0 mx-auto md:mx-0">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
          )}
          <div className="flex-grow text-center md:text-left flex flex-col justify-between gap-6 my-4">
            {title && <h4 className="font-serif font-semibold italic text-2xl">{title}</h4>}
            {subtitle && <p className="text-gray-500 font-oldstyle text-xl">{subtitle}</p>}
            {buttonText && (
              <Button 
                text={buttonText} 
                onClick={onButtonClick}
                className="bg-transparent border border-gray-700 font-oldstyle font-semibold text-gray-400 px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg mx-auto md:mx-0"
                variant='disabled'
              />
            )}
          </div>
        </div>
      );
      
    case 'product':
      return (
        <div className={clsx(baseClasses[variant], className)} {...props}>
          {image && (
            <div className="relative w-full h-56">
              <img src={image} alt={title} className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex flex-col flex-grow p-4">
            {title && <h3 className="text-xl font-serif text-darkRed">{title}</h3>}
            {subtitle && (
              <p className="text-gray-600 font-serif text-sm mb-4 line-clamp-2">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      );
      
    case 'menu':
    case 'default':
    default:
      return (
        <div className={clsx(baseClasses[variant], className)} {...props}>
          {children}
        </div>
      );
  }
};

export default Card;
