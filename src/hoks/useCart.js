// hooks/useCart.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { selectedSize, price } = product;
        set((state) => {
          const existingItem = state.items.find(
            item => item.id === product.id && item.selectedSize === selectedSize
          );
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id && item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { 
              ...product,
              quantity: 1,
              price: selectedSize ? price : product.price // Usa el precio según si es pizza u otro producto
            }],
          };
        });
      },
      
      updateQuantity: (id, quantity, selectedSize) =>
        set((state) => ({
          items: state.items.map(item =>
            item.id === id && item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        })),
      
      removeItem: (id, selectedSize) =>
        set((state) => ({
          items: state.items.filter(
            item => !(item.id === id && item.selectedSize === selectedSize)
          ),
        })),
      
      getTotal: () => {
        const items = get().items;
        return Number(
          items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ).toFixed(2)
        );
      },
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // nombre único para el almacenamiento
    }
  )
);

export const useCart = () => {
  const store = useCartStore();
  
  return {
    items: store.items,
    addItem: store.addItem,
    updateQuantity: store.updateQuantity,
    removeItem: store.removeItem,
    total: store.getTotal(),
    isEmpty: store.items.length === 0,
    clearCart: store.clearCart,
  };
};