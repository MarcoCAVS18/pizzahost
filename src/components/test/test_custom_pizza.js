

// Simulación de imágenes de pizza para pruebas
const leftPizzaImage = "https://example.com/pizza1.jpg";
const rightPizzaImage = "https://example.com/pizza2.jpg";

// Versión original de la función (problemática)
const generateCompositeImageOriginal = (leftImageUrl, rightImageUrl) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    const leftImage = new Image();
    leftImage.src = leftImageUrl;
    leftImage.onload = () => {
      ctx.drawImage(leftImage, 0, 0, 100, 200);

      const rightImage = new Image();
      rightImage.src = rightImageUrl;
      rightImage.onload = () => {
        ctx.drawImage(rightImage, 100, 0, 100, 200);
        resolve(canvas.toDataURL()); // Esta línea causa el error de seguridad
      };
    };
  });
};

// Versión corregida de la función
const generateCompositeImageFixed = (leftImageUrl, rightImageUrl) => {
  // En lugar de generar una imagen compuesta con Canvas, simplemente
  // devolvemos un objeto con las URLs de las imágenes originales
  return {
    leftImage: leftImageUrl,
    rightImage: rightImageUrl
  };
};

// Simulación de la función addItem original (problemática)
const addItemOriginal = (product) => {
  if (product.type === 'custom-pizza') {
    // Lógica para agregar una pizza personalizada
    const customPizza = {
      id: `custom-pizza-${Date.now()}`, // ID único
      name: 'Custom Pizza',
      image: 'ruta/a/imagen/personalizada.png', // Imagen por defecto
      selectedSize: product.size,
      quantity: product.quantity,
      price: product.totalPrice,
      flavors: product.flavors,
      isCustom: true, // Bandera para identificar pizzas personalizadas
    };

    console.log("Pizza personalizada agregada (original):", customPizza);
    return customPizza;
  }
};

// Simulación de la función addItem corregida
const addItemFixed = (product) => {
  if (product.type === 'custom-pizza') {
    // Lógica mejorada para agregar una pizza personalizada
    const customPizza = {
      id: `custom-pizza-${Date.now()}`, // ID único
      name: product.title || 'Custom Pizza',
      // Guardar las URLs de las imágenes originales en lugar de intentar usar una imagen compuesta
      leftImage: product.leftImage,
      rightImage: product.rightImage,
      selectedSize: product.size,
      quantity: product.quantity || 1,
      price: product.totalPrice,
      totalPrice: product.totalPrice * (product.quantity || 1),
      flavors: product.flavors,
      isCustom: true, // Bandera para identificar pizzas personalizadas
      category: 'pizza', // Añadir categoría para que funcione con cupones
    };

    console.log("Pizza personalizada agregada (corregida):", customPizza);
    return customPizza;
  }
};

// Simulación de producto para pruebas
const customPizzaProduct = {
  type: 'custom-pizza',
  size: 'MEDIUM',
  flavors: {
    left: { name: 'Pepperoni', image: leftPizzaImage },
    right: { name: 'Margherita', image: rightPizzaImage }
  },
  quantity: 2,
  totalPrice: 25.99,
  title: 'Pepperoni & Margherita'
};

// Prueba 1: Generar imagen compuesta (versión original vs corregida)
console.log("=== Prueba 1: Generación de imagen compuesta ===");
console.log("Versión original: Intentaría usar canvas.toDataURL() y fallaría con error de seguridad");
console.log("Versión corregida:", generateCompositeImageFixed(leftPizzaImage, rightPizzaImage));

// Prueba 2: Agregar pizza personalizada al carrito (versión original vs corregida)
console.log("\n=== Prueba 2: Agregar pizza personalizada al carrito ===");

// Versión original
console.log("Versión original:");
const originalProduct = addItemOriginal(customPizzaProduct);
console.log("- Imagen:", originalProduct.image);
console.log("- Nombre:", originalProduct.name);
console.log("- Categoría:", originalProduct.category);

// Versión corregida
console.log("\nVersión corregida:");
// Primero aplicamos la función generateCompositeImageFixed
const imageData = generateCompositeImageFixed(
  customPizzaProduct.flavors.left.image,
  customPizzaProduct.flavors.right.image
);

// Luego agregamos al carrito con la información de imágenes
const fixedProduct = addItemFixed({
  ...customPizzaProduct,
  leftImage: imageData.leftImage,
  rightImage: imageData.rightImage
});

console.log("- Imagen izquierda:", fixedProduct.leftImage);
console.log("- Imagen derecha:", fixedProduct.rightImage);
console.log("- Nombre:", fixedProduct.name);
console.log("- Categoría:", fixedProduct.category);

// Resumen de mejoras
console.log("\n=== Resumen de mejoras ===");
console.log("1. Se evita el error de seguridad de Canvas al no usar toDataURL()");
console.log("2. Se guardan las URLs de las imágenes originales para cada mitad");
console.log("3. Se muestra el nombre personalizado de la pizza en lugar de 'Custom Pizza'");
console.log("4. Se agrega la categoría 'pizza' para que funcione con cupones");
console.log("5. Se calcula correctamente el precio total basado en la cantidad");
