export const dynamic = "force-dynamic";
import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
