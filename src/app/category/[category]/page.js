import CategoryPage from "./CategoryPage";

// ✅ Dynamically fetch all categories for static generation
export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    // Extract unique categories
    const categories = [...new Set(data.products.map((p) => p.category.toLowerCase().replace(/\s/g, "-")))];

    return categories.map((category) => ({ category })); // ✅ Correct format
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// ✅ Pass the entire `params` object to CategoryPage
export default function Category({ params }) {
  return <CategoryPage params={params} />;
}
