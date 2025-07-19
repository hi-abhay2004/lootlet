"use client";
import React, { useState } from "react";
import { CardMedia, Typography, Button, Grid } from "@mui/material";
import { useCart } from "../../../context/CartContext";

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            className="w-full max-h-96 object-cover rounded-lg"
            image={product.thumbnail}
            alt={product.title}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
          <Typography variant="body1" color="text.secondary" className="mt-2">
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary" className="mt-2">
            ₹{product.price}  
            <span className="text-green-600 ml-2 text-lg">{product.discountPercentage}% Off</span>
          </Typography>
          <Typography variant="body2" className="text-yellow-600 mt-1">
            ⭐ {product.rating} / 5 | {product.stock} in stock
          </Typography>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-4">
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >-</button>
            <span className="px-2">{qty}</span>
            <button
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setQty(qty + 1)}
            >+</button>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <Button variant="contained" color="primary" onClick={() => addToCart({ ...product, qty })}>Buy Now</Button>
            <Button variant="outlined" color="secondary" onClick={() => addToCart({ ...product, qty })}>Add to Cart</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
