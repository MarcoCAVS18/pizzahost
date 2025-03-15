import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { pizzas } from "../../constants/menuData";
import { useCart } from "../../../hoks/useCart";

// Importamos la imagen de fondo principal
import primaryImage from "../../../assets/images/EQgnndgsDnOFzMSzJxRuiI-4096x4096.webp";

import { AnimationProvider } from "../../../context/ScrollAnimation/AnimationContext";
import ScrollAnimation from "../../../context/ScrollAnimation/ScrollAnimation";

const PizzaSection = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Obtenemos los productos reales de menuData
  const margheritaPizza = pizzas.find(pizza => pizza.id === 'pizza-margherita');
  const pepperoniPizza = pizzas.find(pizza => pizza.id === 'pizza-pepperoni');
  
  // Array de productos a mostrar
  const featuredPizzas = [margheritaPizza, pepperoniPizza].filter(Boolean);
  
  // Handle view menu button click - navigate without the check icon animation
  const handleViewMenu = () => {
    navigate('/menu');
  };

  // Handle add to cart - this will use the standard Button behavior with check icon
  const handleAddToCart = (pizza) => {
    // Default to medium size for home page quick-add
    const selectedSize = 'MEDIUM';
    const quantity = 1;
    
    const itemPrice = pizza.sizes[selectedSize];
    const itemToAdd = {
      ...pizza,
      selectedSize,
      quantity,
      price: itemPrice,
      extras: [],
    };

    addItem(itemToAdd);
  };

  return (
    <AnimationProvider>
      <section className="bg-beige py-8 sm:py-16 px-4 sm:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation delay={0}>
            <p className="text-gray-500 text-sm font-serif italic">
              Explore Our Pizza Favorites
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <h2 className="font-serif font-semibold italic text-4xl sm:text-5xl my-4">
              Elevate Your Dining
              <br />
              Experience with Our
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={400}>
            <div className="flex justify-center">
              <Button
                text="View Menu"
                size="large"
                textColor="text-white"
                bgColor="bg-darkRed"
                className="font-oldstyle font-semibold hover:bg-red py-2 px-6 rounded-full transition text-lg"
                onClick={handleViewMenu}
                isNavigation={true}
              />
            </div>
          </ScrollAnimation>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14">
          {/* Nueva implementación - reemplazo completo del contenedor */}
          <ScrollAnimation delay={600} className="lg:w-1/2 flex items-center">
            {/* Contenedor simple para la imagen */}
            <img
              src={primaryImage}
              alt="Featured pizza"
              className="w-full h-auto rounded-3xl shadow-lg"
            />
          </ScrollAnimation>
          
          {/* Pizzas destacadas */}
          <div className="lg:w-1/2 flex flex-col gap-8 justify-center order-2 lg:order-none">
            {featuredPizzas.map((pizza, index) => (
              <ScrollAnimation key={pizza.id} delay={800 + index * 200}>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  {/* Cuadrado gris con bordes redondeados para la imagen */}
                  <div className="w-72 h-72 md:w-64 md:h-64 flex-shrink-0 mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gray-200 shadow-md">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  {/* Información y botón */}
                  <div className="flex-grow text-center md:text-left flex flex-col justify-between gap-6 my-4">
                    <h4 className="font-serif font-semibold italic text-2xl">
                      {pizza.name}
                    </h4>
                    <p className="text-gray-500 font-oldstyle text-xl">
                      {pizza.description}
                    </p>
                    <Button
                      text="Add to Cart"
                      size="medium"
                      textColor="text-darkRed"
                      bgColor="bg-transparent"
                      className="border border-darkRed hover:bg-darkRed hover:text-white transition-colors rounded-full"
                      onClick={() => handleAddToCart(pizza)}
                      isNavigation={false}
                    />
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default PizzaSection;