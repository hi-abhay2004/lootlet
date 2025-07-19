"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        toast.success("Increased quantity in cart");
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i);
      }
      toast.success("Added to cart");
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast("Removed from cart");
  };
  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
    toast("Updated quantity");
  };
  const clearCart = () => {
    setCart([]);
    toast("Cart cleared");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
