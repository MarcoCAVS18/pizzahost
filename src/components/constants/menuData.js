// src/components/constant/menuData.js

import pizzaMargherita from '../../assets/images/pizzas/pizza8.png'
import pizzaPepperoni from '../../assets/images/pizzas/pizza9.png'
import pizzaMushroom from '../../assets/images/pizzas/pizza10.png'
import pizzaHawaiian from '../../assets/images/pizzas/pizza11.png'
import pizzaBbqChicken from '../../assets/images/pizzas/pizza12.png'

import pastaNapolitana from '../../assets/images/pizzas/pizza8.png'
import pastaCarbonara from '../../assets/images/pizzas/pizza8.png'

import saladGreek from '../../assets/images/pizzas/pizza8.png'
import garlicBread from '../../assets/images/pizzas/pizza8.png'

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
  }
];

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