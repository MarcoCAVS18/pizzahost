// ProductCard.jsx
const ProductCard = ({ image, title, alt, className = '' }) => (
    <div className={`group relative rounded-3xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300 ${className}`}>
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
        <h3 className="text-white font-serif text-xl drop-shadow-lg">{title}</h3>
      </div>
    </div>
);

  export default ProductCard;