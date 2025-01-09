// src/components/constant/menuData.js

import pizzaMargherita from '../../assets/images/pizzas/pizza8.png'
import pizzaPepperoni from '../../assets/images/pizzas/pizza9.png'
import pizzaMushroom from '../../assets/images/pizzas/pizza10.png'
import pizzaHawaiian from '../../assets/images/pizzas/pizza11.png'
import pizzaBbqChicken from '../../assets/images/pizzas/pizza12.png'
import pizzaVegetarian from '../../assets/images/pizzas/pizza13.png'
import pizzaBuffalo from '../../assets/images/pizzas/pizza14.png'
import pizzaSupreme from '../../assets/images/pizzas/pizza15.png'

import pastaNapolitana from '../../assets/images/pasta/pasta4.png'
import pastaCarbonara from '../../assets/images/pasta/pasta5.png'

import saladGreek from '../../assets/images/salads/greeksalad.png'
import garlicBread from '../../assets/images/sides/garlicbread.png'

export const pizzaSizes = {
  SMALL: { name: 'Small', price: 15.50 },
  MEDIUM: { name: 'Medium', price: 20.00 },
  LARGE: { name: 'Large', price: 32.00 },
  XLARGE: { name: 'Extra Large', price: 42.00 }
};

export const pizzas = [
  {
    id: 'pizza-margherita',
    name: 'Margherita',
    description: 'Fresh mozzarella, tomatoes, basil, olive oil, and our signature tomato',
    category: 'pizza',
    sizes: {
      SMALL: 15.50,
      MEDIUM: 20.00,
      LARGE: 32.00,
      XLARGE: 42.00
    },
    image: pizzaMargherita
  },
  {
    id: 'pizza-pepperoni',
    name: 'Classic Pepperoni',
    description: 'Crispy pepperoni, melted mozzarella, and our signature tomato sauce',
    category: 'pizza',
    sizes: {
      SMALL: 16.50,
      MEDIUM: 21.00,
      LARGE: 33.00,
      XLARGE: 43.00
    },
    image: pizzaPepperoni
  },
  {
    id: 'pizza-mushroom',
    name: 'Wild Mushroom',
    description: 'Assorted wild mushrooms, garlic, thyme, mozzarella, and truffle oil',
    category: 'pizza',
    sizes: {
      SMALL: 17.50,
      MEDIUM: 22.00,
      LARGE: 34.00,
      XLARGE: 44.00
    },
    image: pizzaMushroom
  },
  {
    id: 'pizza-hawaiian',
    name: 'Hawaiian Dream',
    description: 'Ham, caramelized pineapple, mozzarella, and our signature tomato.',
    category: 'pizza',
    sizes: {
      SMALL: 16.50,
      MEDIUM: 21.00,
      LARGE: 33.00,
      XLARGE: 43.00
    },
    image: pizzaHawaiian
  },
  {
    id: 'pizza-bbq-chicken',
    name: 'BBQ Chicken',
    description: 'Grilled chicken, red onions, cilantro, mozzarella, and BBQ sauce',
    category: 'pizza',
    sizes: {
      SMALL: 17.50,
      MEDIUM: 22.00,
      LARGE: 34.00,
      XLARGE: 44.00
    },
    image: pizzaBbqChicken
  },
  {
    id: 'pizza-vegetarian',
    name: 'Garden Vegetarian',
    description: 'Fresh bell peppers, mushrooms, red onions, black olives, artichokes, and mozzarella on our signature tomato sauce',
    category: 'pizza',
    sizes: {
      SMALL: 16.50,
      MEDIUM: 21.00,
      LARGE: 33.00,
      XLARGE: 43.00
    },
    image: pizzaVegetarian
  },
  {
    id: 'pizza-buffalo',
    name: 'Spicy Buffalo',
    description: 'Tender chicken tossed in buffalo sauce, red onions, mozzarella, and blue cheese crumbles, drizzled with ranch',
    category: 'pizza',
    sizes: {
      SMALL: 17.50,
      MEDIUM: 22.00,
      LARGE: 34.00,
      XLARGE: 44.00
    },
    image: pizzaBuffalo
  },
  {
    id: 'pizza-supreme',
    name: 'Supreme Deluxe',
    description: 'A feast of pepperoni, Italian sausage, green peppers, onions, mushrooms, black olives, and our signature blend of cheeses',
    category: 'pizza',
    sizes: {
      SMALL: 18.50,
      MEDIUM: 23.00,
      LARGE: 35.00,
      XLARGE: 45.00
    },
    image: pizzaSupreme
  }
];

export const customPizzaOptions = {
  basePrice: {
    SMALL: 15.50,
    MEDIUM: 20.00,
    LARGE: 32.00,
    XLARGE: 42.00
  },
  portionPrice: {
    SMALL: 3.50,
    MEDIUM: 4.50,
    LARGE: 7.00,
    XLARGE: 9.00
  },
  flavors: [
    {
      id: 'margherita-portion',
      name: 'Margherita',
      description: 'Fresh mozzarella, tomatoes, basil',
      image: pizzaMargherita
    },
    {
      id: 'pepperoni-portion',
      name: 'Pepperoni',
      description: 'Crispy pepperoni, melted mozzarella',
      image: pizzaPepperoni
    },
    {
      id: 'mushroom-portion',
      name: 'Mushroom',
      description: 'Wild mushrooms, garlic, thyme',
      image: pizzaMushroom
    },
    {
      id: 'hawaiian-portion',
      name: 'Hawaiian',
      description: 'Ham, caramelized pineapple',
      image: pizzaHawaiian
    },
    {
      id: 'bbq-chicken-portion',
      name: 'BBQ Chicken',
      description: 'Grilled chicken, red onions, BBQ sauce',
      image: pizzaBbqChicken
    },
    {
      id: 'vegetarian-portion',
      name: 'Vegetarian',
      description: 'Bell peppers, onions, mushrooms, olives',
      image: pizzaVegetarian
    },
    {
      id: 'buffalo-portion',
      name: 'Buffalo Chicken',
      description: 'Spicy buffalo chicken, blue cheese, ranch',
      image: pizzaBuffalo
    },
    {
      id: 'supreme-portion',
      name: 'Supreme',
      description: 'Pepperoni, sausage, bell peppers, onions, olives',
      image: pizzaSupreme
    }
  ]
};

export const pasta = [
  {
    id: 'pasta-napolitana',
    name: 'Spaghetti Napolitana',
    description: 'Classic tomato sauce with fresh basil',
    price: 17.50,
    category: 'pasta',
    image: pastaNapolitana
  },
  {
    id: 'pasta-carbonara',
    name: 'Carbonara',
    description: 'Creamy sauce with bacon and parmesan',
    price: 17.50,
    category: 'pasta',
    image: pastaCarbonara
  }
];

export const salads = [
  {
    id: 'salad-greek',
    name: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese and olives',
    sizes: {
      small: 7.50,
      large: 12.00
    },
    category: 'salad',
    image: saladGreek
  }
];

export const sides = [
  {
    id: 'side-garlic-bread',
    name: 'Garlic Bread',
    price: 5.00,
    category: 'side',
    image: garlicBread
  }
];