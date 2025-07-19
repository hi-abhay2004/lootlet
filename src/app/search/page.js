// Ensures this page is treated as a client component for Next.js app directory
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "../components/ui/ProductList";

// Search page for displaying search results
export default function SearchPage() {
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.products || []);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      {/* Hide the search bar on this page, since the header already has one */}
      {/*
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search for products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" type="submit">
          Search
        </button>
      </form>
      */}
      <ProductList products={results} loading={loading} />
      {results.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8">No products found.</p>
      )}
    </div>
  );
}
