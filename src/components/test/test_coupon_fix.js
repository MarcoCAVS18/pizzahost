// Simulación de items del carrito
const cartItems = [
    {
      id: 'pizza1',
      name: 'Pepperoni Pizza',
      category: 'pizza',
      totalPrice: 20,
      quantity: 1
    },
    {
      id: 'pasta1',
      name: 'Spaghetti Carbonara',
      category: 'pasta',
      totalPrice: 15,
      quantity: 1
    },
    {
      id: 'custom1',
      name: 'Custom Pizza',
      isCustom: true,
      totalPrice: 25,
      quantity: 1
    },
    {
      id: 'drink1',
      name: 'Soda',
      category: 'drink',
      totalPrice: 5,
      quantity: 1
    }
  ];
  
  // Simulación del cupón PIZZAMANIA
  const pizzamaniaCoupon = {
    code: "PIZZAMANIA",
    type: "fixed",
    value: 10,
    minOrderValue: 25,
    maxDiscount: 10,
    applyTo: "pizza",
    description: "$10 off on any pizza order above $25"
  };
  
  // Función de cálculo de descuento original (simplificada)
  function calculateDiscountOriginal(coupon, items, subTotal) {
    if (!coupon) return { discountAmount: 0 };
    
    let discountAmount = 0;
    
    if (coupon.applyTo !== 'all') {
      const applicableSubtotal = items.reduce((sum, item) => {
        if (item.category === coupon.applyTo) {
          return sum + item.totalPrice;
        }
        return sum;
      }, 0);
      
      if (coupon.type === 'fixed') {
        discountAmount = Math.min(coupon.value, applicableSubtotal);
      }
    } else {
      if (coupon.type === 'fixed') {
        discountAmount = Math.min(coupon.value, subTotal);
      }
    }
    
    return { discountAmount };
  }
  
  // Función de cálculo de descuento corregida (simplificada)
  function calculateDiscountFixed(coupon, items, subTotal) {
    if (!coupon) return { discountAmount: 0 };
    
    let discountAmount = 0;
    
    if (coupon.applyTo !== 'all') {
      const applicableSubtotal = items.reduce((sum, item) => {
        if (item.category === coupon.applyTo || 
            (coupon.applyTo === 'pizza' && 
             (item.isCustom || 
              (item.name && item.name.toLowerCase().includes('pizza'))))) {
          return sum + item.totalPrice;
        }
        return sum;
      }, 0);
      
      if (coupon.type === 'fixed') {
        discountAmount = Math.min(coupon.value, applicableSubtotal);
      }
    } else {
      if (coupon.type === 'fixed') {
        discountAmount = Math.min(coupon.value, subTotal);
      }
    }
    
    return { discountAmount };
  }
  
  // Calcular subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  console.log('Subtotal total:', subtotal);
  
  // Calcular subtotal solo de pizzas
  const pizzaSubtotal = cartItems.reduce((sum, item) => {
    if (item.category === 'pizza' || item.isCustom || (item.name && item.name.toLowerCase().includes('pizza'))) {
      return sum + item.totalPrice;
    }
    return sum;
  }, 0);
  console.log('Subtotal de pizzas:', pizzaSubtotal);
  
  // Probar la función original
  const originalDiscount = calculateDiscountOriginal(pizzamaniaCoupon, cartItems, subtotal);
  console.log('Descuento original:', originalDiscount.discountAmount);
  
  // Probar la función corregida
  const fixedDiscount = calculateDiscountFixed(pizzamaniaCoupon, cartItems, subtotal);
  console.log('Descuento corregido:', fixedDiscount.discountAmount);
  
  // Verificar si la corrección funciona como se espera
  console.log('¿La corrección funciona correctamente?', fixedDiscount.discountAmount > originalDiscount.discountAmount);
  console.log('Diferencia en el descuento:', fixedDiscount.discountAmount - originalDiscount.discountAmount);
  