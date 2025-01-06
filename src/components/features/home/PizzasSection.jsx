// src/features/home/PizzaSection.jsx

import React from "react";
import Button from "../../ui/Button";
import pizzaImage from "../../../assets/images/pizzas/prueba2.webp";
import primaryImage from "../../../assets/images/EQgnndgsDnOFzMSzJxRuiI-4096x4096.webp";

import { AnimationProvider } from "../../../context/ScrollAnimation/AnimationContext";
import ScrollAnimation from "../../../context/ScrollAnimation/ScrollAnimation";

const PizzaSection = () => {
  const pizzaOptions = [
    {
      image: pizzaImage,
      title: "The Classic",
      subtitle: "Classic Italian Flavors",
      buttonProps: {
        text: "Add to Cart",
        size: "medium",
        textColor: "text-darkRed",
        bgColor: "bg-transparent",
        className: "border border-darkRed hover:bg-darkRed hover:text-white transition-colors",
      },
    },
    {
      image: pizzaImage,
      title: "The Pepperoni",
      subtitle: "A Classic Delight",
      buttonProps: {
        text: "Add to Cart",
        size: "medium",
        textColor: "text-darkRed",
        bgColor: "bg-transparent",
        className: "border border-darkRed hover:bg-darkRed hover:text-white transition-colors",
      },
    },
  ];

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
            <Button
              text="View Menu"
              size="large"
              textColor="text-white"
              bgColor="bg-darkRed"
              className="font-oldstyle font-semibold hover:bg-red py-2 px-6 rounded-full transition text-lg mx-auto md:mx-0"
            />
          </ScrollAnimation>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 min-h-[545px]">
          <div className="lg:w-1/2 h-full order-1 lg:order-none">
            <ScrollAnimation delay={600}>
              <div className="w-full h-full">
                <img
                  src={primaryImage}
                  alt="Featured pizza"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </ScrollAnimation>
          </div>
          <div className="lg:w-1/2 flex flex-col gap-8 justify-start order-2 lg:order-none">
            {pizzaOptions.map((pizza, index) => (
              <ScrollAnimation key={index} delay={800 + index * 200}>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-72 h-72 md:w-72 md:h-64 flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={pizza.image}
                      alt={pizza.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left flex flex-col justify-between gap-6 my-4">
                    <h4 className="font-serif font-semibold italic text-2xl">
                      {pizza.title}
                    </h4>
                    <p className="text-gray-500 font-oldstyle text-xl">
                      {pizza.subtitle}
                    </p>
                    <Button {...pizza.buttonProps} />
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
