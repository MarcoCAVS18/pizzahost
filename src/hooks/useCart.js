import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (product.type === 'custom-pizza') {
          // Lógica mejorada para agregar una pizza personalizada
          // Convertir el precio a número para evitar problemas de tipo
          const priceAsNumber = typeof product.totalPrice === 'string' 
            ? parseFloat(product.totalPrice) 
            : product.totalPrice;
            
          // Verificar que el precio sea un número válido
          if (isNaN(priceAsNumber)) {
            console.error('Error: Precio inválido para pizza personalizada', product);
            return;
          }
          
          const customPizza = {
            id: `custom-pizza-${Date.now()}`, // ID único
            name: product.title || 'Custom Pizza',
            // Guardar las URLs de las imágenes originales
            leftImage: product.leftImage,
            rightImage: product.rightImage,
            selectedSize: product.size,
            quantity: product.quantity || 1,
            price: priceAsNumber, // Usar el precio convertido a número
            basePrice: priceAsNumber, // Añadir basePrice para consistencia
            totalPrice: priceAsNumber * (product.quantity || 1),
            flavors: product.flavors,
            isCustom: true, // Bandera para identificar pizzas personalizadas
            category: 'pizza', // Añadir categoría para cupones
          };

          // Registrar información para depuración
          console.log('Añadiendo pizza personalizada al carrito:', {
            precio: priceAsNumber,
            precioTotal: customPizza.totalPrice,
            tamaño: product.size,
            cantidad: product.quantity
          });

          set((state) => ({
            items: [...state.items, customPizza],
          }));
        } else {
          // Lógica para agregar productos regulares (existente)
          const { selectedSize, quantity = 1 } = product;

          if (product.sizes && !selectedSize) {
            console.error(`Error: selectedSize no definido para el producto ${product.name}`);
            return;
          }

          const basePrice = product.sizes ? product.sizes[selectedSize] : product.price;
          if (!basePrice) {
            console.error(`Error: Precio no encontrado para el producto ${product.name}`);
            return;
          }

          set((state) => {
            const existingItem = state.items.find(
              (item) => item.id === product.id && item.selectedSize === selectedSize
            );

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id && item.selectedSize === selectedSize
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            }

            return {
              items: [
                ...state.items,
                {
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  selectedSize,
                  quantity,
                  basePrice,
                  extras: [],
                  extrasPrice: 0,
                  totalPrice: basePrice * quantity,
                  ingredients: product.ingredients || [],
                  sizes: product.sizes,
                  category: product.category || null, // Asegurar que la categoría se guarde
                },
              ],
            };
          });
        }
      },

      updateQuantity: (id, quantity, selectedSize) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id && item.selectedSize === selectedSize) {
            return {
              ...item,
              quantity,
              totalPrice: item.isCustom 
                ? item.price * quantity 
                : (item.basePrice + item.extrasPrice) * quantity,
            };
          }
          return item;
        }),
      })),

      removeItem: ({ id, selectedSize }) => {
        // Registrar información para depuración
        console.log('Eliminando item del carrito:', { id, selectedSize });
        
        set((state) => {
          // Verificar si el item existe antes de eliminarlo
          const itemToRemove = state.items.find(
            (item) => item.id === id && item.selectedSize === selectedSize
          );
          
          if (!itemToRemove) {
            console.error('Error: Item no encontrado para eliminar', { id, selectedSize });
            return { items: state.items };
          }
          
          // Filtrar el item a eliminar
          const newItems = state.items.filter(
            (item) => !(item.id === id && item.selectedSize === selectedSize)
          );
          
          console.log('Items restantes después de eliminar:', newItems.length);
          
          return { items: newItems };
        });
      },

      updateIngredients: (id, newSize, updatedData) => set((state) => {
        // Encontrar el ítem actual
        const currentItem = state.items.find(
          (item) => item.id === id && item.selectedSize === updatedData.size
        );

        // Si el tamaño no ha cambiado, simplemente actualizar los ingredientes y extras
        if (currentItem && currentItem.selectedSize === newSize) {
          const newExtrasPrice = updatedData.extras.reduce((total, extra) => total + extra.price, 0);
          return {
            items: state.items.map((item) => {
              if (item.id === id && item.selectedSize === newSize) {
                return {
                  ...item,
                  ingredients: updatedData.baseIngredients,
                  extras: updatedData.extras,
                  extrasPrice: newExtrasPrice,
                  totalPrice: (item.basePrice + newExtrasPrice) * item.quantity,
                };
              }
              return item;
            }),
          };
        } 
        // Si el tamaño ha cambiado, actualizar el tamaño, el precio base y todo lo demás
        else {
          // Buscar el elemento con el tamaño anterior
          const oldItem = state.items.find(
            (item) => item.id === id && (item.selectedSize === updatedData.size || item.selectedSize === currentItem?.selectedSize)
          );
          
          if (!oldItem) {
            console.error("Ítem no encontrado para actualizar");
            return { items: state.items };
          }
          
          // Obtener el nuevo precio base según el nuevo tamaño
          const newBasePrice = oldItem.sizes ? oldItem.sizes[newSize] : oldItem.price;
          
          if (!newBasePrice) {
            console.error(`Precio no encontrado para el tamaño ${newSize}`);
            return { items: state.items };
          }
          
          const newExtrasPrice = updatedData.extras.reduce((total, extra) => total + extra.price, 0);
          
          return {
            items: state.items.map((item) => {
              if (item.id === id && (item.selectedSize === updatedData.size || item.selectedSize === currentItem?.selectedSize)) {
                return {
                  ...item,
                  selectedSize: newSize,
                  basePrice: newBasePrice,
                  ingredients: updatedData.baseIngredients,
                  extras: updatedData.extras,
                  extrasPrice: newExtrasPrice,
                  totalPrice: (newBasePrice + newExtrasPrice) * item.quantity,
                };
              }
              return item;
            }),
          };
        }
      }),

      getTotal: () =>
        get()
          .items.reduce((total, item) => total + item.totalPrice, 0)
          .toFixed(2),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage', version: 1 }
  )
);

export const useCart = () => {
  const store = useCartStore();
  return {
    ...store,
    total: store.getTotal(),
    isEmpty: store.items.length === 0,
  };
};