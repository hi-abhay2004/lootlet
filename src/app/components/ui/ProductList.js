"use client";

// ProductList component for displaying a list of products
import ProductCard from './ProductCard';
import { motion } from "framer-motion";

export default function ProductList({ products, loading = false }) {
  if (loading) {
    // Skeleton loader
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-64" />
        ))}
      </div>
    );
  }
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
