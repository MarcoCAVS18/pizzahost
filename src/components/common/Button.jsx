import clsx from "clsx";

const Button = ({ text, onClick, className, variant = "primary" }) => {
  const textColor = clsx({
    "text-white": variant === "primary",
    "text-black": variant === "secondary",
    "text-gray-500": variant === "disabled",
  });

  return (
    <button
      onClick={onClick}
      className={`bg-darkRed ${textColor} text-sm font-serif py-4 px-8 rounded-3xl hover:bg-red transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
