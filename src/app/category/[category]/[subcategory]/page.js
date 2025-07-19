import CategoryPage from "./CategoryPage";

// Server component: receives params and passes to client CategoryPage
export async function generateStaticParams() {
  // Fetch all categories from DummyJSON
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const categories = [
    ...new Set(data.products.map((p) => p.category.toLowerCase().replace(/\s/g, "-")))
  ];
  // For each category, generate a single subcategory (e.g. 'all')
  return categories.map((category) => ({ category, subcategory: "all" }));
}

export default function Page({ params }) {
  return <CategoryPage params={params} />;
}
