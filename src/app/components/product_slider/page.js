"use client";
import React from "react";
import styles from "./ProductSlider.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductSlider = ({ banner = [] }) => { // ✅ Prevents 'undefined' error
  if (!banner.length) {
    return <p>No banners available</p>; // ✅ Fallback UI if banner array is empty
  }

  return (
    <div className={styles.productSlider}>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {banner.map((item) => (
          <div key={item.id}>
            <img src={`/banner_images/${item.image}`} alt={`Banner ${item.id}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
