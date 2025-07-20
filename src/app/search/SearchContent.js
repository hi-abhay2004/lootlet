"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "../components/ui/ProductList";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(initialQuery)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.products || []);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [initialQuery]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <ProductList products={results} loading={loading} />
      {results.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8">No products found.</p>
      )}
    </div>
  );
}
