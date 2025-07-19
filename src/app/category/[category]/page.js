import CategoryPage from "./CategoryPage";



export async function generateStaticParams() {
  try {
    // Fetch from dummyjson
    const res1 = await fetch('https://dummyjson.com/products?limit=100');
    const data1 = await res1.json();

    // Fetch from fakestoreapi for more categories
    const res2 = await fetch('https://fakestoreapi.com/products');
    const data2 = await res2.json();

    // Combine and normalize categories
    const categories1 = data1.products.map((p) => p.category.toLowerCase().replace(/\s/g, '-'));
    const categories2 = data2.map((p) => p.category.toLowerCase().replace(/\s/g, '-'));

    // Merge + remove duplicates
    const allCategories = [...new Set([...categories1, ...categories2])];

    console.log("✔ Available categories:", allCategories);

    // Map to static paths
    return allCategories.map((category) => ({ category }));
  } catch (error) {
    console.error('❌ Error generating static params:', error);
    return [];
  }
}


export default function Category({ params }) {
  return <CategoryPage params={params} />;
}
