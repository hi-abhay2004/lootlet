import ProductDetail from "./ProductsDetail";

// ✅ Fetch all product IDs for static generation
export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    
    return data.products.map((product) => ({ id: product.id.toString() }));
  } catch (error) {
    console.error("Error fetching product IDs:", error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  const { id } = params;

  // ✅ Fetch product details on the server
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return <ProductDetail product={product} />;
}
