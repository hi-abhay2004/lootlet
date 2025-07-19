"use client";
import { motion } from "framer-motion";

// CartItem component for displaying a single cart item
export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <motion.div
      className="flex items-center justify-between py-2 border-b"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="flex items-center gap-4">
        <img src={item.thumbnail} alt={item.title} className="h-16 w-16 object-cover rounded" />
        <div>
          <h4 className="font-semibold">{item.title}</h4>
          <p className="text-gray-600">₹{Number(item.price).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => onQuantityChange(item.qty - 1 > 0 ? item.qty - 1 : 1)}
        >
          -
        </button>
        <span className="px-2">{item.qty}</span>
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => onQuantityChange(item.qty + 1)}
        >
          +
        </button>
        <button onClick={() => onRemove(item.id)} className="text-red-500 ml-2">Remove</button>
      </div>
    </motion.div>
  );
}
