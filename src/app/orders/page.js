"use client";
import React, { useEffect, useState } from "react";

// Helper to get orders from localStorage
function getOrdersFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  } catch {
    return [];
  }
}

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    setOrders(getOrdersFromStorage());
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order ID: {order.id}</span>
                <span className="text-sm text-blue-600">{order.status}</span>
              </div>
              <div className="mb-2 text-sm text-gray-600">Placed on: {new Date(order.placedAt).toLocaleDateString()}</div>
              <div className="mb-2 text-sm text-gray-600">Delivery by: <span className="font-semibold text-green-700">{new Date(order.deliveryDate).toLocaleDateString()}</span></div>
              <div className="mb-2 text-sm text-gray-600">Payment: {order.paymentMethod}</div>
              <div className="mb-2 text-sm text-gray-600">Shipping to: {order.name}, {order.phone}, {order.address}</div>
              <div className="mb-2 text-sm text-gray-600">Email: {order.email}</div>
              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.title} x {item.qty} - ₹{Number(item.price * item.qty).toFixed(2)}</li>
                  ))}
                </ul>
              </div>
              <div className="font-bold mt-2">Total: ₹{Number(order.total).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
