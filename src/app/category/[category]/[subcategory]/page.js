"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from "@mui/material";

const SubCategoryProducts = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        // Simulate subcategory filtering
        const filteredProducts = data.products.filter((product) => 
          product.category.toLowerCase() === category.replace(/-/g, " ") &&
          product.title.toLowerCase().includes(subcategory.replace(/-/g, " "))
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  return (
    <div className="max-w-screen-xl mx-auto my-8 p-4">
      <Typography variant="h4" className="font-bold text-gray-800 mb-6 capitalize">
        {category.replace(/-/g, " ")} - {subcategory.replace(/-/g, " ")}
      </Typography>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.length === 0 ? (
          <Typography variant="h6" color="textSecondary">No products found</Typography>
        ) : (
          products.map((product) => (
            <Card key={product.id} sx={{ maxWidth: 250 }} className="shadow-lg rounded-lg border border-gray-200">
              <CardActionArea>
                <CardMedia component="img" height="160" image={product.thumbnail} alt={product.title} />
                <CardContent>
                  <Typography variant="subtitle1" className="font-semibold truncate">{product.title}</Typography>
                  <Typography variant="h6" color="primary" className="font-bold">
                    ₹{product.price * 83}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly />
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export function generateStaticParams() {
  // You can return an empty array for dynamic routes if you don't want to pre-render any paths
  return [];
}

export default SubCategoryProducts;
