import React from "react";
import Button from "../../ui/Button";
import { pasta } from "../../constants/menuData";
import { useCart } from "../../../hoks/useCart";

// Importamos la imagen principal
import primaryImage from "../../../assets/images/pasta/pastaMain.webp";

import { AnimationProvider } from "../../../context/ScrollAnimation/AnimationContext";
import ScrollAnimation from "../../../context/ScrollAnimation/ScrollAnimation";

const PastaSection = () => {
  const { addItem } = useCart();

  // Obtenemos los productos reales de menuData
  const pastaNapolitana = pasta.find(p => p.id === 'pasta-napolitana');
  const pastaCarbonara = pasta.find(p => p.id === 'pasta-carbonara');
  
  // Array de productos a mostrar
  const featuredPasta = [pastaNapolitana, pastaCarbonara].filter(Boolean);

  // Handle add to cart - this will use the standard Button behavior with check icon
  const handleAddToCart = (product) => {
    // Ahora la pasta tiene tamaños, así que usamos el tamaño regular por defecto
    const selectedSize = 'REGULAR';
    const quantity = 1;
    
    const itemPrice = product.sizes[selectedSize];
    const itemToAdd = {
      ...product,
      selectedSize,
      quantity,
      price: itemPrice,
      extras: [],
    };

    addItem(itemToAdd);
  };

  return (
    <AnimationProvider>
      <section className="bg-beige py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollAnimation delay={0}>
              <p className="text-gray-500 text-sm font-serif italic">
                Satisfy Your Cravings
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <h2 className="font-serif font-semibold italic text-4xl sm:text-5xl mt-4">
                Pasta Perfection
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={300}>
              <h3 className="text-gray-600 text-md sm:text-lg font-oldstyle mt-6 max-w-3xl mx-auto">
                Discover our wide array of delectable pasta dishes, from classic
                spaghetti and meatballs to innovative vegetarian creations.
                <br className="hidden sm:block" />
                Each plate is a culinary masterpiece, crafted with the freshest
                ingredients and cooked to perfection
              </h3>
            </ScrollAnimation>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14">
            {/* Tarjetas a la izquierda */}
            <div className="lg:w-1/2 flex flex-col gap-8 justify-center order-last lg:order-first">
              {featuredPasta.map((pastaItem, index) => (
                <ScrollAnimation key={pastaItem.id} delay={800 + index * 200}>
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Cuadrado gris con bordes redondeados para la imagen */}
                    <div className="w-72 h-72 md:w-64 md:h-64 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gray-200 shadow-md">
                      <img
                        src={pastaItem.image}
                        alt={pastaItem.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    
                    {/* Información y botón */}
                    <div className="flex-grow text-center md:text-left flex flex-col justify-between gap-6 my-4">
                      <h4 className="font-serif font-semibold italic text-2xl">
                        {pastaItem.name}
                      </h4>
                      <p className="text-gray-500 font-oldstyle text-xl">
                        {pastaItem.description}
                      </p>
                      <Button
                        text="Add to Cart"
                        size="medium"
                        textColor="text-darkRed"
                        bgColor="bg-transparent"
                        className="border border-darkRed hover:bg-darkRed hover:text-white transition-colors rounded-full"
                        onClick={() => handleAddToCart(pastaItem)}
                        isNavigation={false}
                      />
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
            
            {/* Imagen a la derecha - Versión simplificada y confiable */}
            <div className="lg:w-1/2 order-first lg:order-last">
              <ScrollAnimation delay={600}>
                <img
                  src={primaryImage}
                  alt="Featured pasta dish"
                  className="w-full rounded-3xl shadow-lg"
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default PastaSection;