import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

// 1. Create a context
const cartContext = createContext();

// 2. Custom hook to access cart context
export const useCart = () => useContext(cartContext);

// 3. Context Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  //  Load cart data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      // console.log("Loaded from localStorage:", stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCart(parsed);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      setCart([]);
    }
  }, []);

  //  Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //  Add product to cart
  const addToCart = product => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // If already in cart, increase quantity
        toast.success(`${existing.title} quantity increased`);
        return prev.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        // If not, add with quantity 1
        toast.success("Item is added to cart!");
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Open drawer if not on cart page
    if (location.pathname !== "/cart") {
      setIsDrawerOpen(true);
    }
  };

  // Decrease quantity or remove item
  const removeFromCart = productId => {
    setCart(
      prev => prev.map(item => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter(item => item.quantity > 0) // Remove item if quantity 0
    );
  };

  //  Clear cart entirely
  const clearCart = () => {
    setCart([]);
  };

  return <cartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isDrawerOpen, setIsDrawerOpen }}>{children}</cartContext.Provider>;
};
