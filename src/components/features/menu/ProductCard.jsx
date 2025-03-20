import clsx from "clsx";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { pizzaSizes } from "../../constants/menuData";
import Button from "../../ui/Button";

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const hasSize = !!product.sizes;
  const availableSizes = hasSize ? Object.keys(product.sizes) : [];
  const [selectedSize, setSelectedSize] = useState(() => hasSize ? availableSizes[0]?.toUpperCase() : null);
  const [quantity, setQuantity] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const getPrice = () => {
    if (!hasSize) return (Number(product.price) || 0) * quantity;
    return (Number(product.sizes[selectedSize?.toUpperCase()]) || 0) * quantity;
  };

  const handleAddToCart = () => {
    if (hasSize && (!selectedSize || !availableSizes.includes(selectedSize))) {
      console.error("Tamaño no válido o no seleccionado");
      return;
    }

    onAddToCart(product, selectedSize?.toUpperCase(), quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="bg-transparent rounded-3xl shadow-2xl border-2 hover:scale-105 transition-all duration-300 w-full flex flex-col">
      <div className="relative w-full h-56">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-xl font-serif text-darkRed">{product.name}</h3>
        {product.ingredients && (
          <p className="text-gray-600 font-serif text-sm mb-4">{product.ingredients.map(ing => ing.name).join(", ")}</p>
        )}
        {hasSize && (
          <div className="mb-4">
            <label className="font-oldstyle text-gray-600">Size</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {availableSizes.map((sizeKey) => {
                const normalizedSize = sizeKey.toUpperCase();
                return (
                  <button
                    key={sizeKey}
                    onClick={() => setSelectedSize(normalizedSize)}
                    className={clsx(
                      "px-4 py-2 text-sm font-serif rounded-full border shadow-md transition-all",
                      selectedSize === normalizedSize ? "bg-darkRed text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {pizzaSizes[normalizedSize]?.name || normalizedSize}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-serif text-darkRed">${getPrice().toFixed(2)}</span>
          <button onClick={onToggleWishlist} className={clsx("text-xl transition-colors", isInWishlist ? "text-red-500" : "text-gray-400")}>
            <FaHeart />
          </button>
        </div>
        <div className="flex items-center gap-4 mt-auto h-12">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-1/3 h-full px-2 bg-transparent appearance-none rounded-lg border shadow-md text-center font-serif text-gray-700"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
          <div className="w-2/3 h-full">
            <Button
              text="Add to Cart"
              onClick={handleAddToCart}
              className="w-full h-full"
              bgColor="bg-darkRed"
              hoverColor="hover:bg-lightRed"
              isCartButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;