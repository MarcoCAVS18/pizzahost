// components/features/home/PastaSection.jsx

import React from "react";
import Button from "../../ui/Button";
import pastaImage from "../../../assets/images/pasta/pasta1.webp";
import pastaImage2 from "../../../assets/images/pasta/pasta2.webp";
import primaryImage from "../../../assets/images/pasta/pastaMain.webp";

import { AnimationProvider } from "../../../context/ScrollAnimation/AnimationContext";
import ScrollAnimation from "../../../context/ScrollAnimation/ScrollAnimation";

const PastaSection = () => {
  const pastaOptions = [
    {
      image: pastaImage,
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
      image: pastaImage2,
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
            <ScrollAnimation delay={400}>
              <h3 className="text-gray-600 text-md sm:text-lg font-oldstyle mt-6 max-w-3xl mx-auto">
                Discover our wide array of delectable pasta dishes, from classic
                spaghetti and meatballs to innovative vegetarian creations.
                <br className="hidden sm:block" />
                Each plate is a culinary masterpiece, crafted with the freshest
                ingredients and cooked to perfection
              </h3>
            </ScrollAnimation>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14">
            <div className="lg:w-1/2 flex flex-col gap-8">
              {pastaOptions.map((pasta, index) => (
                <ScrollAnimation key={index} delay={600 + index * 200}>
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-72 h-72 md:w-72 md:h-64 flex-shrink-0 mx-auto md:mx-0">
                      <img
                        src={pasta.image}
                        alt={pasta.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex-grow text-center md:text-left flex flex-col justify-between gap-6 my-4">
                      <h4 className="font-serif font-semibold italic text-2xl">
                        {pasta.title}
                      </h4>
                      <p className="text-gray-500 font-oldstyle text-xl">
                        {pasta.subtitle}
                      </p>
                      <Button {...pasta.buttonProps} />
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
            <div className="lg:w-1/2 relative">
              <ScrollAnimation delay={1000}>
                <div className="aspect-square w-full overflow-hidden rounded-3xl">
                  <img
                    src={primaryImage}
                    alt="Featured pasta dish"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default PastaSection;