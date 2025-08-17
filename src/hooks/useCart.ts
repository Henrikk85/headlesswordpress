import { useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '../types/Product';

const CART_STORAGE_KEY = 'autopedant_cart';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.product.sale_price || item.product.price);
      return sum + (price * item.quantity);
    }, 0);
    
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return { total, itemCount };
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        newItems = [...prevCart.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...prevCart.items, { product, quantity }];
      }

      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        itemCount
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        itemCount
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const { total, itemCount } = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        total,
        itemCount
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    });
  };

  const getItemQuantity = (productId: number): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };
};
