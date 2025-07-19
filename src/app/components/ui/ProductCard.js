"use client";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";

// ProductCard component for displaying a single product
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-4 flex flex-col"
      whileHover={{ scale: 1.04 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <img src={product.thumbnail} alt={product.title} className="h-40 object-cover rounded mb-2" />
      <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
      <p className="text-gray-600 mb-2">₹{Number(product.price * 83).toFixed(2)}</p>
      <button
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
      <a
        href={`/products/${product.id}`}
        className="mt-2 text-blue-500 underline text-sm text-center"
      >
        View Details
      </a>
    </motion.div>
  );
}
