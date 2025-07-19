"use client";
import React, { useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from "@mui/material";

export interface CategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const { category, subcategory } = params;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        // For now, just filter by category, ignore subcategory
        const filteredProducts = data.products.filter((product: any) =>
          product.category.toLowerCase().replace(/\s/g, "-") === category
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
  {(category ?? "").replace(/-/g, " ")} - {(subcategory ?? "").replace(/-/g, " ")}
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
                    ₹{Number(product.price * 83).toFixed(2)}
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

export default CategoryPage;
