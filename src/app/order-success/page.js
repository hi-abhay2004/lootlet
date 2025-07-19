"use client";

import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";

// Order success page
export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);
  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      toast.success("Order placed successfully!");
      hasCleared.current = true;
    }
  }, []);

  // Calculate delivery date (2 days from now)
  const deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-4">Your order was placed successfully.</p>
      <div className="mb-4 text-lg text-green-700 font-semibold">
        Estimated Delivery Date: {deliveryDate.toLocaleDateString()}
      </div>
      <div className="mt-8">
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
