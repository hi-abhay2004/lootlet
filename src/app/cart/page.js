"use client";

import { useCart } from "../../context/CartContext";
import CartItem from "../components/ui/CartItem";
import { useMemo } from "react";

// Cart page for listing cart items
export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="bg-white rounded shadow p-4 mb-4">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onQuantityChange={qty => updateQty(item.id, qty)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <span className="text-xl font-bold">Total: ₹{total}</span>
        <a href="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Checkout</a>
      </div>
    </div>
  );
}
