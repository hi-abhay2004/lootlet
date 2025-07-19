"use client";

import { useCart } from "../../context/CartContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: `ORD${Date.now()}`,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        status: "Placed",
        placedAt: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        address: data.address,
        name: data.name,
        email: data.email,
        phone: data.phone,
        paymentMethod: data.payment,
      };
      localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));
      clearCart();
      setLoading(false);
      router.push("/order-success");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded shadow p-6 flex flex-col gap-4">
        {/* Tile 1: User Details */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Shipping Details</h2>
          <input
            className="border p-2 rounded mb-2 w-full"
            placeholder="Full Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          <input
            className="border p-2 rounded mb-2 w-full"
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          <input
            className="border p-2 rounded mb-2 w-full"
            placeholder="Phone Number"
            type="tel"
            {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
          />
          {errors.phone && <span className="text-red-500 text-sm">Valid phone number is required</span>}
          <input
            className="border p-2 rounded mb-2 w-full"
            placeholder="Address"
            {...register("address", { required: true })}
          />
          {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
        </div>
        {/* Tile 2: Payment Options */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" value="Pay on Delivery" {...register("payment", { required: true })} /> Pay on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="UPI" {...register("payment", { required: true })} /> UPI
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="Net Banking" {...register("payment", { required: true })} /> Net Banking
            </label>
          </div>
          {errors.payment && <span className="text-red-500 text-sm">Select a payment method</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
