// Archivo de prueba para verificar la solución de cupones con pizzas personalizadas
// Guardar como test_pizzamania_coupon.js

// Simulación de productos en el carrito
const cartItems = [
    // Pizza personalizada
    {
      id: 'custom-pizza-1234567890',
      name: 'Pepperoni & Margherita',
      leftImage: 'https://example.com/pepperoni.jpg',
      rightImage: 'https://example.com/margherita.jpg',
      selectedSize: 'MEDIUM',
      quantity: 1,
      price: 25.99,
      basePrice: 25.99,
      totalPrice: 25.99,
      isCustom: true,
      category: 'pizza'
    },
    // Producto regular (no pizza)
    {
      id: 'product-1',
      name: 'Garlic Bread',
      image: 'https://example.com/garlic-bread.jpg',
      selectedSize: 'REGULAR',
      quantity: 2,
      basePrice: 5.99,
      totalPrice: 11.98,
      category: 'sides'
    },
    // Producto regular (pizza)
    {
      id: 'product-2',
      name: 'Pepperoni Pizza',
      image: 'https://example.com/pepperoni-pizza.jpg',
      selectedSize: 'LARGE',
      quantity: 1,
      basePrice: 18.99,
      totalPrice: 18.99,
      category: 'pizza'
    }
  ];
  
  // Simulación de cupones
  const coupons = {
    'WELCOME15': {
      id: 'coupon-1',
      code: 'WELCOME15',
      type: 'percentage',
      value: 15,
      applyTo: 'all',
      minOrderValue: 0,
      description: '15% off your first order'
    },
    'FREESHIP': {
      id: 'coupon-2',
      code: 'FREESHIP',
      type: 'shipping',
      value: 100,
      applyTo: 'all',
      minOrderValue: 30,
      description: 'Free shipping on orders over $30'
    },
    'PIZZAMANIA': {
      id: 'coupon-3',
      code: 'PIZZAMANIA',
      type: 'percentage',
      value: 20,
      applyTo: 'pizza',
      minOrderValue: 0,
      description: '20% off all pizzas'
    }
  };
  
  // Función para calcular el descuento (versión simplificada de useCoupon.js)
  function calculateDiscount(coupon, items, subTotal, shippingCost) {
    if (!coupon) {
      return {
        discountAmount: 0,
        discountedShipping: shippingCost,
        originalShipping: shippingCost,
        discountType: null,
        discountDescription: '',
        couponCode: null,
        couponId: null,
        minOrderValue: 0,
        applicableCategory: 'all'
      };
    }
  
    let discountAmount = 0;
    let discountedShipping = shippingCost;
    
    // Si el cupón está restringido a ciertos productos
    if (coupon.applyTo !== 'all') {
      // Calcular el subtotal de solo los productos aplicables
      const applicableSubtotal = items.reduce((sum, item) => {
        // Verificar si el item tiene la categoría correcta
        // Para PIZZAMANIA, verificamos si el item es una pizza
        if (item.category === coupon.applyTo || 
            // También considerar pizzas personalizadas o items que contengan "pizza" en el nombre
            (coupon.applyTo === 'pizza' && 
             (item.isCustom || 
              (item.name && item.name.toLowerCase().includes('pizza'))))) {
          
          const itemPrice = item.totalPrice || item.price || 0;
          return sum + itemPrice;
        }
        return sum;
      }, 0);
      
      console.log(`Subtotal aplicable para ${coupon.code} (${coupon.applyTo}):`, applicableSubtotal);
      
      // Calcular el descuento solo sobre productos aplicables
      switch (coupon.type) {
        case 'percentage':
          discountAmount = (coupon.value / 100) * applicableSubtotal;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
          break;
        
        case 'fixed':
          discountAmount = Math.min(coupon.value, applicableSubtotal);
          break;
          
        default:
          break;
      }
    } else {
      // Descuento sobre el total (comportamiento normal)
      switch (coupon.type) {
        case 'percentage':
          discountAmount = (coupon.value / 100) * subTotal;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
          break;
          
        case 'fixed':
          discountAmount = Math.min(coupon.value, subTotal);
          break;
          
        case 'shipping':
          // Envío gratis o descuento en envío
          discountedShipping = coupon.value === 100 ? 0 : shippingCost * (1 - (coupon.value / 100));
          break;
          
        default:
          break;
      }
    }
    
    return {
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      discountedShipping: parseFloat(discountedShipping.toFixed(2)),
      originalShipping: shippingCost,
      discountType: coupon.type,
      discountDescription: coupon.description,
      couponCode: coupon.code,
      couponId: coupon.id,
      minOrderValue: coupon.minOrderValue,
      applicableCategory: coupon.applyTo
    };
  }
  
  // Calcular subtotal del carrito
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  console.log('Subtotal del carrito:', subtotal.toFixed(2));
  
  // Calcular subtotal de solo pizzas
  const pizzaSubtotal = cartItems.reduce((sum, item) => {
    if (item.category === 'pizza' || item.isCustom || (item.name && item.name.toLowerCase().includes('pizza'))) {
      return sum + item.totalPrice;
    }
    return sum;
  }, 0);
  console.log('Subtotal de pizzas:', pizzaSubtotal.toFixed(2));
  
  // Calcular subtotal de productos que no son pizzas
  const nonPizzaSubtotal = subtotal - pizzaSubtotal;
  console.log('Subtotal de productos que no son pizzas:', nonPizzaSubtotal.toFixed(2));
  
  // Probar cada cupón
  console.log('\n=== Prueba de cupones ===');
  
  // 1. WELCOME15 (15% de descuento en todo)
  const welcome15Result = calculateDiscount(coupons['WELCOME15'], cartItems, subtotal, 5);
  console.log('\nCupón WELCOME15:');
  console.log('Descuento:', welcome15Result.discountAmount.toFixed(2));
  console.log('Envío:', welcome15Result.discountedShipping.toFixed(2));
  console.log('Total con descuento:', (subtotal - welcome15Result.discountAmount + welcome15Result.discountedShipping).toFixed(2));
  
  // 2. FREESHIP (envío gratis en pedidos mayores a $30)
  const freeshipResult = calculateDiscount(coupons['FREESHIP'], cartItems, subtotal, 5);
  console.log('\nCupón FREESHIP:');
  console.log('Descuento:', freeshipResult.discountAmount.toFixed(2));
  console.log('Envío:', freeshipResult.discountedShipping.toFixed(2));
  console.log('Total con descuento:', (subtotal - freeshipResult.discountAmount + freeshipResult.discountedShipping).toFixed(2));
  
  // 3. PIZZAMANIA (20% de descuento en pizzas)
  const pizzamaniaResult = calculateDiscount(coupons['PIZZAMANIA'], cartItems, subtotal, 5);
  console.log('\nCupón PIZZAMANIA:');
  console.log('Descuento:', pizzamaniaResult.discountAmount.toFixed(2));
  console.log('Envío:', pizzamaniaResult.discountedShipping.toFixed(2));
  console.log('Total con descuento:', (subtotal - pizzamaniaResult.discountAmount + pizzamaniaResult.discountedShipping).toFixed(2));
  
  // Verificar que PIZZAMANIA aplica correctamente a pizzas personalizadas
  console.log('\n=== Verificación de PIZZAMANIA con pizzas personalizadas ===');
  
  // Calcular el descuento esperado (20% del subtotal de pizzas)
  const expectedPizzamaniaDiscount = pizzaSubtotal * 0.2;
  console.log('Descuento esperado (20% de pizzas):', expectedPizzamaniaDiscount.toFixed(2));
  console.log('Descuento calculado:', pizzamaniaResult.discountAmount.toFixed(2));
  console.log('¿Coinciden?', Math.abs(expectedPizzamaniaDiscount - pizzamaniaResult.discountAmount) < 0.01 ? 'SÍ ✓' : 'NO ✗');
  
  // Verificar que PIZZAMANIA no aplica a productos que no son pizzas
  console.log('\n=== Verificación de que PIZZAMANIA no aplica a productos que no son pizzas ===');
  console.log('Subtotal de productos que no son pizzas:', nonPizzaSubtotal.toFixed(2));
  console.log('Descuento que debería aplicarse a productos que no son pizzas: 0.00');
  console.log('¿El descuento es correcto?', Math.abs(pizzamaniaResult.discountAmount - expectedPizzamaniaDiscount) < 0.01 ? 'SÍ ✓' : 'NO ✗');
  
  // Resumen
  console.log('\n=== Resumen ===');
  console.log('1. WELCOME15: Descuento de $' + welcome15Result.discountAmount.toFixed(2) + ' en todo el pedido');
  console.log('2. FREESHIP: Envío gratis (ahorro de $' + (welcome15Result.originalShipping - freeshipResult.discountedShipping).toFixed(2) + ')');
  console.log('3. PIZZAMANIA: Descuento de $' + pizzamaniaResult.discountAmount.toFixed(2) + ' solo en pizzas');
  console.log('\nEl cupón PIZZAMANIA funciona correctamente con pizzas personalizadas: ' + (Math.abs(expectedPizzamaniaDiscount - pizzamaniaResult.discountAmount) < 0.01 ? 'SÍ ✓' : 'NO ✗'));
  