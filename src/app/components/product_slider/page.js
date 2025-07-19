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
      <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false} showArrows={true} emulateTouch={true}>
        {banner.map((item, idx) => (
          <div key={item.id || idx} style={{height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5'}}>
            <img src={`/banner_images/banner${idx+1}.png`} alt={`Banner ${idx+1}`} style={{maxHeight: '200px', width: "1260px",  margin: '0 auto'}} loading="lazy" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
