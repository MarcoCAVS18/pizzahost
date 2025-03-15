import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimationProvider } from '../../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import { FEATURED_PRODUCTS } from '../../../components/constants/ProductData';

// Creamos un mapeo basado en el índice/posición para evitar depender del ID
// Esto asume que el orden de las tarjetas es fijo: Pizza, Sides, Pasta, Custom Pizza
const getCategoryById = (productId, index) => {
  // Log para depuración
  console.log("Product ID:", productId, "Index:", index);
  
  // Mapeo basado en el índice de la tarjeta
  if (index === 0) return 'pizza';     // Primera tarjeta
  if (index === 1) return 'side';      // Segunda tarjeta
  if (index === 2) return 'pasta';     // Tercera tarjeta
  if (productId.includes('custom') || index === 3) return 'custom-pizza'; // Tarjeta de pizza personalizada
  
  // Valor por defecto
  return 'pizza';
};

const FeaturedCard = ({ product, index, delay, onClick }) => {
  return (
    <ScrollAnimation delay={delay}>
      <div 
        onClick={onClick}
        className="block relative rounded-3xl overflow-hidden aspect-square shadow-md group cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h3 className="text-white font-serif text-xl md:text-2xl drop-shadow-lg">
            {product.title}
          </h3>
        </div>
      </div>
    </ScrollAnimation>
  );
};

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleCardClick = (productId, index) => {
    console.log("Clicked on product:", productId, "at index:", index);
    
    // Determinar la categoría basada en el índice y/o ID
    const categoryId = getCategoryById(productId, index);
    
    // Para custom pizza, ir directamente a esa sección
    if (categoryId === 'custom-pizza') {
      console.log("Navigating to custom pizza section");
      navigate('/menu#custom-pizza');
      return;
    }
    
    // Para el resto de categorías, navegar a la sección del menú con la categoría correcta
    console.log("Navigating to category:", categoryId);
    navigate('/menu#menu-section', { 
      state: { 
        activeCategory: categoryId 
      } 
    });
  };

  return (
    <AnimationProvider>
      <section className="bg-beige py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <ScrollAnimation delay={0}>
              <p className="text-gray-600 font-oldstyle mb-3">
                Indulge in our Specialty Pizzas
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl">
                Flavors You'll Love
              </h2>
            </ScrollAnimation>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product, index) => (
              <FeaturedCard 
                key={product.id}
                product={product}
                index={index}
                delay={300 + (index * 100)}
                onClick={() => handleCardClick(product.id, index)}
              />
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {FEATURED_PRODUCTS.slice(0, 3).map((product, index) => (
                <FeaturedCard 
                  key={product.id}
                  product={product}
                  index={index}
                  delay={300 + (index * 100)}
                  onClick={() => handleCardClick(product.id, index)}
                />
              ))}
            </div>
            
            <ScrollAnimation delay={600}>
              <div 
                onClick={() => handleCardClick(FEATURED_PRODUCTS[3].id, 3)}
                className="block relative rounded-3xl overflow-hidden aspect-[21/9] shadow-md group cursor-pointer"
              >
                <img
                  src={FEATURED_PRODUCTS[3].image}
                  alt={FEATURED_PRODUCTS[3].alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-white font-serif text-2xl drop-shadow-lg">
                    {FEATURED_PRODUCTS[3].title}
                  </h3>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {FEATURED_PRODUCTS.map((product, index) => (
              <FeaturedCard 
                key={product.id}
                product={product}
                index={index}
                delay={300 + (index * 100)}
                onClick={() => handleCardClick(product.id, index)}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default FeaturedProducts;