import React from "react";
import Link from "next/link";
import { Typography, Rating } from "@mui/material";
import ProductList from "../../components/ui/ProductList";
import FilterSidebar from "../../components/ui/FilterSidebar";

// ✅ Fetch products based on category
async function fetchProducts(category) {
    try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) return [];
        const data = await res.json();

        // Normalize category names
        const formattedCategory = category.replace(/-/g, " ").toLowerCase();
        return data.products.filter((product) => product.category.toLowerCase() === formattedCategory);
    } catch (error) {
        // Instead of throwing, just return empty array
        return [];
    }
}

// ✅ Server Component (Next.js 13+)
const CategoryPage = async ({ params }) => {
    if (!params?.category) {
        return <Typography variant="h6" color="textSecondary">Invalid category</Typography>;
    }

    const { category } = params;
    const products = await fetchProducts(category);

    return (
        <div className="max-w-screen-xl mx-auto my-8 p-4">
            <Typography variant="h4" className="font-bold text-gray-800 mb-6 capitalize">
                {category.replace(/-/g, " ")}
            </Typography>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                    <FilterSidebar filters={{}} onChange={() => {}} />
                </div>
                <div className="flex-1">
                    {products.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">No products found</Typography>
                    ) : (
                        <ProductList products={products} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
