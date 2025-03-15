import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const Button = ({
  text = "Button",
  loadingText = null, // Texto a mostrar mientras se procesa (ej: "Logging in...")
  onClick,
  className,
  size = "medium",
  textColor = "text-white",
  bgColor = "bg-darkRed",
  fontFamily = "font-serif",
  rounded = "rounded-2xl",
  hoverColor = "hover:bg-red",
  fontSize = "text-base",
  isNavigation = false, // Para botones de navegación
  isCartButton = false, // Para botones de carrito
  type = "button", // Para botones de formulario
  disabled = false, // Para deshabilitar el botón
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    // Si es un botón de tipo submit, dejamos que el formulario maneje el evento
    if (type === "submit") {
      // Si hay una función onClick, la ejecutamos sin interferir con el comportamiento del formulario
      if (onClick) {
        onClick(e);
      }
      return;
    }

    // Para botones de carrito, mostramos el check si no está en estado disabled
    if (isCartButton && !disabled && !isLoading) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 2000);
    }

    // Si hay loadingText, activamos el estado de carga
    if (loadingText && !isLoading && !disabled) {
      setIsLoading(true);
    }

    // Ejecutar onClick si existe y el botón no está deshabilitado
    if (onClick && !disabled) {
      Promise.resolve(onClick(e)).finally(() => {
        // Si había estado de carga, lo desactivamos cuando termine la promesa
        if (isLoading) {
          setIsLoading(false);
        }
      });
    }
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-8 py-4 text-base",
    large: "px-10 py-5 text-lg",
  };

  // Determinar el color de fondo según el estado
  let currentBgColor = bgColor;
  if (isClicked && isCartButton) {
    currentBgColor = "bg-green";
  } else if (disabled) {
    currentBgColor = "bg-gray-400"; // Color para botón deshabilitado
  }

  // Create different classNames based on button type
  const buttonClasses = clsx(
    sizeClasses[size],
    textColor,
    currentBgColor,
    fontFamily,
    fontSize,
    rounded,
    // Para botones de carrito, no aplicar hover cuando está clickeado
    // Para botones deshabilitados, no aplicar hover
    !disabled && (!isClicked || !isCartButton) ? hoverColor : "",
    "transition duration-300 ease-in-out flex items-center justify-center",
    disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
    className
  );

  // Determinar el texto a mostrar
  let displayText = text;
  
  // Si está en estado de carga y hay un texto de carga, mostrar ese texto
  if (isLoading && loadingText) {
    displayText = loadingText;
  } 
  // Para botones de carrito clickeados, mostrar el ícono de check
  else if (isClicked && isCartButton) {
    displayText = <FaCheck className="text-white text-xl" />;
  }

  return (
    <button 
      type={type}
      onClick={handleClick} 
      className={buttonClasses}
      disabled={disabled || isLoading}
    >
      {displayText}
    </button>
  );
};

export default Button;