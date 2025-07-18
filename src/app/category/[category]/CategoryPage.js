import React from "react";
import Link from "next/link";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from "@mui/material";

// ✅ Fetch products based on category
async function fetchProducts(category) {
    try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        // Normalize category names
        const formattedCategory = category.replace(/-/g, " ").toLowerCase();
        return data.products.filter((product) => product.category.toLowerCase() === formattedCategory);
    } catch (error) {
        console.error("Error fetching products:", error);
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

            {products.length === 0 ? (
                <Typography variant="h6" color="textSecondary">No products found</Typography>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} passHref>
                            <Card
                                sx={{ maxWidth: 250, cursor: "pointer" }}
                                className="shadow-lg rounded-lg border border-gray-200 transition-transform hover:scale-105"
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={product.thumbnail}
                                        alt={product.title}
                                        sx={{ objectFit: "contain", backgroundColor: "#f8f8f8" }}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" className="font-semibold truncate">
                                            {product.title}
                                        </Typography>
                                        <Typography variant="h6" color="primary" className="font-bold">
                                            ₹{Math.round(product.price * 83)}
                                        </Typography>
                                        <Rating value={product.rating} precision={0.5} readOnly />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
