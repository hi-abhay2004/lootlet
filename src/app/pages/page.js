import React from 'react'
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import ProductSlider from '../components/product_slider/page'
import ProductItem from '../components/product_items/page'
import Category from '../components/category/page'



const products = [
  { id: 1, name: "Running Shoes", price: "$49.99", image: "p1.png" },
  { id: 2, name: "Smart Watch", price: "$99.99", image: "p2.webp" },
  { id: 3, name: "Wireless Headphones", price: "$129.99", image: "p3.webp" },
  { id: 4, name: "Laptop Bag", price: "$39.99", image: "p4.webp" },
  { id: 5, name: "Gaming Mouse", price: "$49.99", image: "p5.webp" },
  { id: 6, name: "Smartphone", price: "$799.99", image: "p6.webp" },
  { id: 7, name: "Bluetooth Speaker", price: "$59.99", image: "p7.webp" },
  { id: 8, name: "Smart TV", price: "$999.99", image: "p8.webp" },
];

const banner = [
  {id: 1,image: "desktop.webp",},
  {id: 2,image: "flight.webp",},
  {id: 3,image: "flight1.webp",},
  {id: 4,image: "fight2.webp",},
  {id: 5,image: "mobile.webp",},
];
const category_img=[
  {id: 1,image: "appliances.webp",name:'Appliances'},
  {id: 2,image: "electronic.webp",name:'Electronics'},
  {id: 3,image: "fashion.webp",name:'Fashion'},
  {id: 4,image: "grocery.webp",name:'Grocery'},
  {id: 5,image: "home and furniture.webp",name:'furniture'},
  {id: 6,image: "mobile.webp",name:'Mobile'},
  {id: 7,image: "toys.webp",name:'Toys'},
  {id: 8,image: "travel.webp",name:'Travel'},
  {id: 9,image: "two wheels.webp",name:'Two Wheels'},
  
]

const subCategory=[
  {id: 1,image:"cycle.jpeg",name:'Cycle'},
  {id: 2,image:"food.jpeg",name:'Food'},
  {id: 3,image:"instruments.jpeg",name:'Instrument'},
  {id: 4,image:"microphone.jpeg",name:'Microphone'},
  {id: 5,image:"RCToys.jpeg",name:'RC Toys'},
  {id: 6,image:"softtoys.jpeg",name:'Soft Toys'},
  {id: 7,image:"Statanory.jpeg",name:'Statanory'},
  
]

const Home = () => {
  return (

    <div>
      {/* <Header /> */}
      <Category category_img={category_img}/>
      
      <ProductSlider banner={banner}/>
      <ProductItem products={products}/>
      <ProductItem subCategory={subCategory} showBanner={false}/>
      {/* <Footer /> */}
    </div>
  )
}

export default Home