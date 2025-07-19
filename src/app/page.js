"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Home from "./pages/page"; // Adjust the path if needed
import ProductSlider from "./components/product_slider/page";
import ProductList from "./components/ui/ProductList";

export default function IndexPage() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        fetch("https://dummyjson.com/products/categories"),
        fetch("https://dummyjson.com/products?limit=100"),
      ]);
      const catData = await catRes.json();
      const prodData = await prodRes.json();
      setCategories(catData);
      setFeatured(prodData.products.slice(0, 8));
      // Group products by category
      const grouped = {};
      prodData.products.forEach((p) => {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push(p);
      });
      setCategoryProducts(grouped);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Add a global page loader for navigation events
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('pageshow', handleStop);
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('pageshow', handleStop);
    };
  }, []);

  return (
    <React.StrictMode>
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Hero Banner Carousel */}
        <div className="mb-8">
          <div className="rounded-xl shadow-lg overflow-hidden">
            {/* Use the ProductSlider carousel with all banner images */}
            <ProductSlider banner={[
              { id: 1, image: "desktop.webp" },
              { id: 2, image: "flight.webp" },
              { id: 3, image: "flight1.webp" },
              { id: 4, image: "fight2.webp" },
              { id: 5, image: "mobile.webp" },
            ]} />
          </div>
        </div>
        {/* Categories */}
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
  {loading ? (
    <div className="col-span-full text-center text-gray-500 text-lg animate-pulse">Loading categories...</div>
  ) : (
    categories
      .filter(cat => ![
        "motorcycle",
        "skin care",
        "smartphones",
        "sports accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens bags",
        "womens dresses",
        "womens jewellery",
        "womens shoes",
        "womens watches"
      ].includes(cat.name?.toLowerCase()))
      .map((cat) => (
      <button
        key={cat.slug}
        onClick={() => {
          setLoadingCategory(cat.slug);
          window.location.href = `/category/${encodeURIComponent(cat.slug)}`;
        }}
        className={`group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 border border-gray-200 hover:border-blue-400 ${loadingCategory === cat.slug ? 'opacity-60 pointer-events-none border-blue-600' : ''}`}
      >
        {/* Category Image */}
        <img
          src={`/category_images/${cat.slug}.webp`}
          alt={cat.name}
          className="h-16 w-16 object-contain mb-2 group-hover:scale-110 transition-transform duration-300 ease-in-out"
          onError={(e) => (e.target.style.display = "none")}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 pointer-events-none rounded-xl"></div>

        {/* Category Label */}
        <span className="capitalize text-sm font-medium text-gray-700 group-hover:text-blue-700">
          {cat.name}
        </span>

        {/* Loading Spinner */}
        {loadingCategory === cat.slug && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl z-10">
            <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </span>
        )}
      </button>
    ))
  )}
</div>

        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 text-center">Loading...</div>
          ) : (
            featured.map((product) => (
              <button
                key={product.id}
                onClick={async () => {
                  setLoadingProduct(product.id);
                  window.location.href = `/products/${product.id}`;
                }}
                className={`bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col relative w-full ${loadingProduct === product.id ? 'opacity-60 pointer-events-none' : ''}`}
                style={{ border: loadingProduct === product.id ? '2px solid #2563eb' : undefined }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-32 w-full object-contain mb-2 rounded"
                />
                <div className="flex-1 flex flex-col">
                  <span className="font-semibold truncate mb-1">
                    {product.title}
                  </span>
                  <span className="text-blue-700 font-bold mb-1">
                    ₹{Number(product.price * 83).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.brand}
                  </span>
                </div>
                {loadingProduct === product.id && (
                  <span className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg">
                    <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  </span>
                )}
              </button>
            ))
          )}
        </div>
        {/* Products by Category */}
        <div className="mt-12">
          {categories
            .filter(cat => ![
              "motorcycle",
              "skin care",
              "smartphones",
              "sports accessories",
              "sunglasses",
              "tablets",
              "tops",
              "vehicle",
              "womens bags",
              "womens dresses",
              "womens jewellery",
              "womens shoes",
              "womens watches"
            ].includes(cat.name?.toLowerCase()))
            .map((cat) => {
              // Find products for this category
              const products = Object.values(categoryProducts)
                .flat()
                .filter(p => p.category?.toLowerCase() === cat.name?.toLowerCase());
              if (!products.length) return null;
              return (
                <div key={cat.slug || cat.name} className="mb-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold capitalize">{cat.name}</h3>
                    <Link href={`/category/${cat.slug || cat.name}`}
                      className="text-blue-600 hover:underline text-sm font-medium">
                      View all
                    </Link>
                  </div>
                  <div>
                    <ProductList
                      products={products.slice(0, 4)}
                      loading={loading}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {/* Global Loader Overlay */}
        {((loadingCategory !== null) || (loadingProduct !== null)) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
            <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        )}
      </div>
    </React.StrictMode>
  );
}
