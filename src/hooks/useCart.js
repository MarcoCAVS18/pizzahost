// src/hooks/useCart.js - Improved with automatic sync
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserCart, syncCart, clearCart as clearFirebaseCart } from '../services/cartService';

// Zustand store for cart state
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      synced: false, // Track if cart has been synced with Firebase
      initialLoadComplete: false, // Track if initial load has completed

      addItem: (product) => {
        if (product.type === 'custom-pizza') {
          // Logic for adding a custom pizza
          const priceAsNumber = typeof product.totalPrice === 'string' 
            ? parseFloat(product.totalPrice) 
            : product.totalPrice;
            
          if (isNaN(priceAsNumber)) {
            console.error('Error: Invalid price for custom pizza', product);
            return;
          }
          
          const customPizza = {
            id: `custom-pizza-${Date.now()}`, // Unique ID
            name: product.title || 'Custom Pizza',
            leftImage: product.leftImage,
            rightImage: product.rightImage,
            selectedSize: product.size,
            quantity: product.quantity || 1,
            price: priceAsNumber,
            basePrice: priceAsNumber,
            totalPrice: priceAsNumber * (product.quantity || 1),
            flavors: product.flavors,
            isCustom: true,
            category: 'pizza',
          };

          set((state) => ({
            items: [...state.items, customPizza],
            synced: false, // Mark as needing sync
          }));
        } else {
          // Logic for regular products
          const { selectedSize, quantity = 1 } = product;

          if (product.sizes && !selectedSize) {
            console.error(`Error: selectedSize not defined for product ${product.name}`);
            return;
          }

          const basePrice = product.sizes ? product.sizes[selectedSize] : product.price;
          if (!basePrice) {
            console.error(`Error: Price not found for product ${product.name}`);
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
                synced: false, // Mark as needing sync
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
                  category: product.category || null,
                },
              ],
              synced: false, // Mark as needing sync
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
        synced: false, // Mark as needing sync
      })),

      removeItem: ({ id, selectedSize }) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => !(item.id === id && item.selectedSize === selectedSize)
          );
          
          return { 
            items: newItems,
            synced: false, // Mark as needing sync
          };
        });
      },

      updateIngredients: (id, newSize, updatedData) => set((state) => {
        // Find the current item
        const currentItem = state.items.find(
          (item) => item.id === id && item.selectedSize === updatedData.size
        );

        // If size hasn't changed, just update ingredients and extras
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
            synced: false, // Mark as needing sync
          };
        } 
        // If size has changed, update size, base price and everything else
        else {
          // Find the item with the previous size
          const oldItem = state.items.find(
            (item) => item.id === id && (item.selectedSize === updatedData.size || item.selectedSize === currentItem?.selectedSize)
          );
          
          if (!oldItem) {
            console.error("Item not found for update");
            return { items: state.items };
          }
          
          // Get the new base price based on the new size
          const newBasePrice = oldItem.sizes ? oldItem.sizes[newSize] : oldItem.price;
          
          if (!newBasePrice) {
            console.error(`Price not found for size ${newSize}`);
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
            synced: false, // Mark as needing sync
          };
        }
      }),

      getTotal: () => {
        return get()
          .items.reduce((total, item) => total + item.totalPrice, 0)
          .toFixed(2);
      },

      clearCart: () => set({ 
        items: [],
        synced: false, // Mark as needing sync
      }),

      // Methods for Firebase synchronization
      loadCartFromFirebase: (items = []) => set({
        items: items || [],
        synced: true, // Mark as synced after loading
        initialLoadComplete: true // Mark initial load as complete
      }),

      setSynced: (value) => set({
        synced: value
      }),

      setInitialLoadComplete: (value) => set({
        initialLoadComplete: value
      }),
    }),
    { name: 'cart-storage', version: 1 }
  )
);

/**
 * Custom hook that extends useCartStore with Firebase synchronization
 */
export const useCart = () => {
  const store = useCartStore();
  const { user } = useAuth();
  const initialLoadRef = useRef(false);
  const syncTimeoutRef = useRef(null);
  const syncInProgressRef = useRef(false);

  // Clear any pending sync timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  // Load cart from Firebase when user logs in - ONCE only
  useEffect(() => {
    const loadCart = async () => {
      if (!user?.uid || initialLoadRef.current || store.initialLoadComplete) {
        return;
      }
      
      // Set the flag to prevent concurrent loads
      initialLoadRef.current = true;
      
      try {
        console.log("Loading cart from Firebase for user:", user.uid);
        const firebaseCart = await getUserCart(user.uid);
        
        if (Array.isArray(firebaseCart) && firebaseCart.length > 0) {
          // If Firebase cart exists, replace local cart
          store.loadCartFromFirebase(firebaseCart);
          console.log("Cart loaded from Firebase:", firebaseCart.length, "items");
        } else if (store.items.length > 0) {
          // If local cart has items but Firebase doesn't, save local cart to Firebase
          await syncCart(user.uid, store.items);
          store.setSynced(true);
          console.log("Local cart saved to Firebase:", store.items.length, "items");
        }
        
        // Mark initial load as complete
        store.setInitialLoadComplete(true);
      } catch (error) {
        console.error("Error syncing cart with Firebase:", error);
      }
    };

    if (user?.uid) {
      loadCart();
    }
  }, [user, store]);

  // Auto-sync cart with Firebase when it changes and user is logged in
  useEffect(() => {
    // Debounce sync to avoid too many requests
    const syncWithDebounce = () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      
      syncTimeoutRef.current = setTimeout(async () => {
        if (!user?.uid || syncInProgressRef.current || store.synced) {
          return;
        }
        
        syncInProgressRef.current = true;
        
        try {
          await syncCart(user.uid, store.items);
          store.setSynced(true);
          console.log("Cart automatically synced with Firebase");
        } catch (error) {
          console.error("Error auto-syncing cart with Firebase:", error);
        } finally {
          syncInProgressRef.current = false;
        }
      }, 2000); // 2 second debounce
    };
    
    if (user?.uid && !store.synced && store.initialLoadComplete) {
      syncWithDebounce();
    }
  }, [user, store.items, store.synced, store.initialLoadComplete]);

  // Handle cart clearing with Firebase
  const clearCartWithSync = async () => {
    store.clearCart();
    
    if (user?.uid) {
      try {
        await clearFirebaseCart(user.uid);
        console.log("Cart cleared in Firebase");
      } catch (error) {
        console.error("Error clearing cart in Firebase:", error);
      }
    }
  };

  return {
    ...store,
    total: store.getTotal(),
    isEmpty: store.items.length === 0,
    clearCart: clearCartWithSync, // Override clearCart with Firebase sync
  };
};

export default useCart;