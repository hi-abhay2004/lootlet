"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const dropdownCategories = {
  Fashion: ["Men", "Women", "Kids"],
  Electronics: ["Mobiles", "Laptops", "Accessories"],
  Home: ["Furniture", "Decor", "Kitchen"],
  Toys: ["Action Figures", "Board Games", "Outdoor Toys"]
};

const Category = ({ category_img = [] }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleClick = (category) => {
    router.push(`/category/${category.toLowerCase().replace(/\s/g, "-")}`);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    router.push(`/category/${category.toLowerCase().replace(/\s/g, "-")}/${subcategory.toLowerCase().replace(/\s/g, "-")}`);
    setAnchorEl(null); // Close dropdown after clicking
    setActiveCategory(null);
  };

  const handleMouseEnter = (event, category) => {
    if (dropdownCategories[category.name]) {
      clearTimeout(hoverTimeout);
      setAnchorEl(event.currentTarget);
      setActiveCategory(category.name);
    }
  };

  const handleMouseLeave = () => {
    setHoverTimeout(setTimeout(() => {
      setAnchorEl(null);
      setActiveCategory(null);
    }, 150));
  };

  return (
    <div className="w-3/4 flex justify-center gap-9 mx-auto bg-white my-4">
      {category_img.map((item) => (
        <div key={item.id} className="relative">
          <Card 
            sx={{ width: 100, height: 110, textAlign: "center", borderRadius: 0 }} 
            onMouseEnter={(e) => handleMouseEnter(e, item)}
          >
            <CardActionArea onClick={() => handleClick(item.name)}>
              <CardMedia component="img" className="w-16 h-16 m-auto"  image={`/category_images/${item.image}`} alt={item.name} />
              <CardContent sx={{ padding: "4px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>{item.name}</Typography>
                {dropdownCategories[item.name] && <KeyboardArrowDownIcon fontSize="small" />}
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Dropdown for specific categories */}
          {dropdownCategories[item.name] && (
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl) && activeCategory === item.name} 
              onClose={handleMouseLeave} 
              MenuListProps={{ onMouseLeave: handleMouseLeave }}
              sx={{ mt: 1 }}
            >
              {dropdownCategories[item.name].map((sub, index) => (
                <MenuItem key={index} onClick={() => handleSubcategoryClick(item.name, sub)}>
                  {sub}
                </MenuItem>
              ))}
            </Menu>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
