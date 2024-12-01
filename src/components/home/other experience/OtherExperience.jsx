import React from "react";
import SideCard from "./SideCard";
import friesImage from "../../../assets/images/pizzas/prueba2.webp";
import garlicKnotsImage from "../../../assets/images/pizzas/prueba2.webp";
import dippingSaucesImage from "../../../assets/images/pizzas/prueba2.webp";
import appImage from "../../../assets/images/pizzas/prueba2.webp";

const OtherExperience = () => {
  const cards = [
    {
      image: friesImage,
      title: "Crispy Golden Fries",
      subtitle: "Perfectly Salted",
      description:
        "Indulge in our perfectly crisp and golden fries, made fresh to order and seasoned to perfection.",
    },
    {
      image: garlicKnotsImage,
      title: "Garlic Knots",
      subtitle: "Buttery Goodness",
      description:
        "Savor the irresistible combination of warm, fluffy dough and fragrant garlic in every bite of our delectable garlic knots.",
    },
    {
      image: dippingSaucesImage,
      title: "Dipping Sauces",
      subtitle: "Elevate Your Experience",
      description:
        "Discover a variety of delectable dipping sauces to complement your favorite sides.",
    },
    {
      image: appImage,
      title: "Download Our App",
      subtitle: "Convenient Ordering",
      description:
        "Discover the ultimate pizza and pasta experience with our app for convenient ordering.",
    },
  ];

  return (
    <section className="bg-darkRed py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-beige font-oldstyle text-2xl">
          Explore Our Sides
        </h2>
        <p className="text-white font-serif italic text-4xl mb-8">
          Pair it with Perfection
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <SideCard
              key={index}
              image={card.image}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherExperience;
