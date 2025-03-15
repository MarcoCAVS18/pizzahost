// src/components/constants/menuData.js

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

// Añadimos tamaños para la pasta
export const pastaSizes = {
  REGULAR: { name: 'Regular', price: 17.50 },
  LARGE: { name: 'Large', price: 22.00 }
};

// Toppings en inglés
export const pizzaToppings = [
  { id: 'topping-extra-cheese', name: 'Extra Cheese', price: 1.50, category: 'cheese' },
  { id: 'topping-pepperoni', name: 'Pepperoni', price: 2.00, category: 'meat' },
  { id: 'topping-mushrooms', name: 'Mushrooms', price: 1.25, category: 'vegetable' },
  { id: 'topping-olives', name: 'Olives', price: 1.00, category: 'vegetable' },
  { id: 'topping-ham', name: 'Ham', price: 1.75, category: 'meat' },
  { id: 'topping-bacon', name: 'Bacon', price: 2.25, category: 'meat' },
  { id: 'topping-bell-peppers', name: 'Bell Peppers', price: 1.25, category: 'vegetable' },
];

export const pizzas = [
  {
    id: 'pizza-margherita',
    name: 'Margherita',
    description: 'Our classic signature pizza',
    ingredients: [
      { id: 1, name: 'Fresh mozzarella', removable: true },
      { id: 2, name: 'Tomatoes', removable: true },
      { id: 3, name: 'Basil', removable: true },
      { id: 4, name: 'Olive oil', removable: true },
      { id: 5, name: 'Signature tomato sauce', removable: false }
    ],
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
    description: 'Our traditional favorite with spicy pepperoni',
    ingredients: [
      { id: 1, name: 'Pepperoni', removable: true },
      { id: 2, name: 'Mozzarella', removable: true },
      { id: 3, name: 'Oregano', removable: true },
      { id: 4, name: 'Signature tomato sauce', removable: false }
    ],
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
    description: 'A delightful combination of forest flavors',
    ingredients: [
      { id: 1, name: 'Wild mushrooms', removable: true },
      { id: 2, name: 'Fresh mozzarella', removable: true },
      { id: 3, name: 'Garlic', removable: true },
      { id: 4, name: 'Thyme', removable: true },
      { id: 5, name: 'Truffle oil', removable: true },
      { id: 6, name: 'Signature tomato sauce', removable: false }
    ],
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
    description: 'Sweet and savory tropical combination',
    ingredients: [
      { id: 1, name: 'Ham', removable: true },
      { id: 2, name: 'Caramelized pineapple', removable: true },
      { id: 3, name: 'Mozzarella', removable: true },
      { id: 4, name: 'Signature tomato sauce', removable: false }
    ],
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
    description: 'Smoky and tangy barbecue flavors',
    ingredients: [
      { id: 1, name: 'Grilled chicken', removable: true },
      { id: 2, name: 'Red onions', removable: true },
      { id: 3, name: 'Cilantro', removable: true },
      { id: 4, name: 'Mozzarella', removable: true },
      { id: 5, name: 'BBQ sauce', removable: false }
    ],
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
    description: 'A colorful medley of fresh vegetables',
    ingredients: [
      { id: 1, name: 'Fresh bell peppers', removable: true },
      { id: 2, name: 'Mushrooms', removable: true },
      { id: 3, name: 'Red onions', removable: true },
      { id: 4, name: 'Black olives', removable: true },
      { id: 5, name: 'Artichokes', removable: true },
      { id: 6, name: 'Mozzarella', removable: true },
      { id: 7, name: 'Signature tomato sauce', removable: false }
    ],
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
    description: 'Zesty buffalo chicken with a kick',
    ingredients: [
      { id: 1, name: 'Buffalo chicken', removable: true },
      { id: 2, name: 'Red onions', removable: true },
      { id: 3, name: 'Mozzarella', removable: true },
      { id: 4, name: 'Blue cheese crumbles', removable: true },
      { id: 5, name: 'Ranch drizzle', removable: true },
      { id: 6, name: 'Buffalo sauce', removable: false }
    ],
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
    description: 'The ultimate combination of toppings',
    ingredients: [
      { id: 1, name: 'Pepperoni', removable: true },
      { id: 2, name: 'Italian sausage', removable: true },
      { id: 3, name: 'Green peppers', removable: true },
      { id: 4, name: 'Onions', removable: true },
      { id: 5, name: 'Mushrooms', removable: true },
      { id: 6, name: 'Black olives', removable: true },
      { id: 7, name: 'Mozzarella blend', removable: true },
      { id: 8, name: 'Signature tomato sauce', removable: false }
    ],
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

export const pasta = [
  {
    id: 'pasta-napolitana',
    name: 'Spaghetti Napolitana',
    description: 'Classic tomato sauce with fresh basil',
    ingredients: [
      { id: 1, name: 'Spaghetti pasta', removable: false },
      { id: 2, name: 'Tomato sauce', removable: false },
      { id: 3, name: 'Fresh basil', removable: true },
      { id: 4, name: 'Parmesan cheese', removable: true },
      { id: 5, name: 'Olive oil', removable: true },
      { id: 6, name: 'Garlic', removable: true }
    ],
    category: 'pasta',
    sizes: {
      REGULAR: 17.50,
      LARGE: 22.00
    },
    image: pastaNapolitana
  },
  {
    id: 'pasta-carbonara',
    name: 'Carbonara',
    description: 'Creamy sauce with bacon and parmesan',
    ingredients: [
      { id: 1, name: 'Spaghetti pasta', removable: false },
      { id: 2, name: 'Bacon', removable: true },
      { id: 3, name: 'Parmesan cheese', removable: true },
      { id: 4, name: 'Egg yolks', removable: false },
      { id: 5, name: 'Black pepper', removable: true },
      { id: 6, name: 'Heavy cream', removable: false }
    ],
    category: 'pasta',
    sizes: {
      REGULAR: 17.50,
      LARGE: 22.00
    },
    image: pastaCarbonara
  }
];

export const salads = [
  {
    id: 'salad-greek',
    name: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese and olives',
    ingredients: [
      { id: 1, name: 'Fresh lettuce', removable: false },
      { id: 2, name: 'Tomatoes', removable: true },
      { id: 3, name: 'Cucumbers', removable: true },
      { id: 4, name: 'Red onions', removable: true },
      { id: 5, name: 'Feta cheese', removable: true },
      { id: 6, name: 'Kalamata olives', removable: true },
      { id: 7, name: 'Olive oil dressing', removable: true }
    ],
    category: 'salad',
    sizes: {
      SMALL: 7.50,
      LARGE: 12.00
    },
    image: saladGreek
  }
];

export const sides = [
  {
    id: 'side-garlic-bread',
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic butter and herbs',
    ingredients: [
      { id: 1, name: 'Baguette', removable: false },
      { id: 2, name: 'Garlic butter', removable: false },
      { id: 3, name: 'Herbs', removable: true },
      { id: 4, name: 'Parmesan (optional)', removable: true }
    ],
    category: 'side',
    // Convertimos el precio a estructura de tamaños para evitar el problema con CartItem
    sizes: {
      REGULAR: 5.00
    },
    image: garlicBread
  }
];