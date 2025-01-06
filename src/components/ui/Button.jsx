// components/ui/Button.jsx

import clsx from "clsx";

const Button = ({
  text = "Button",
  onClick,
  className,
  size = "medium", 
  textColor = "text-white", 
  bgColor = "bg-darkRed", 
  fontFamily = "font-serif", 
  rounded = "rounded-2xl", 
  hoverColor = "hover:bg-red", 
  fontSize = "text-base", 
}) => {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-8 py-4 text-base",
    large: "px-10 py-5 text-lg",
  };

  const buttonClasses = clsx(
    sizeClasses[size],
    textColor,
    bgColor,
    fontFamily,
    fontSize,
    rounded,
    hoverColor,
    "transition duration-300 ease-in-out",
    className
  );

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
};

export default Button;
