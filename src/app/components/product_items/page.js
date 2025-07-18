"use client";
import React from "react";
import styles from "./ProductItem.module.css";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 6 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 6 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 464 }, items: 2 },
  smallMobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const ProductItem = ({ products = [], subCategory = [], showBanner = true }) => {
  const items = products.length > 0 ? products : subCategory; // Choose the correct array

  return (
    <div className={styles.productContainer}>
      {/* Carousel Section */}
      <div className={styles.carouselContainer}>
        <Carousel 
          responsive={responsive} 
          showDots={false} 
          arrows={true} 
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
        >
          {items.map((item) => (
            <Card 
              key={item.id} 
              className={styles.productItem}
              sx={{ 
                maxWidth: 200, 
                textAlign: "center", 
                margin: "auto", 
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={`/product_images/${item.image}`} 
                alt={item.name}
                sx={{ height: 150, objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.name}
                </Typography>
                {item.price && (
                  <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                    {item.price}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>

      {/* Mini Banner - Only show if showBanner is true */}
      {showBanner && (
        <div className={styles.miniBanner}>
          <img src="/banner_images/mini-banner.png" alt="Mini Banner" />
        </div>
      )}
    </div>
  );
};

export default ProductItem;
