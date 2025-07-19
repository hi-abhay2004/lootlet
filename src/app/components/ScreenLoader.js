"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ScreenLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events?.on?.("routeChangeStart", handleStart);
    router.events?.on?.("routeChangeComplete", handleStop);
    router.events?.on?.("routeChangeError", handleStop);

    return () => {
      router.events?.off?.("routeChangeStart", handleStart);
      router.events?.off?.("routeChangeComplete", handleStop);
      router.events?.off?.("routeChangeError", handleStop);
    };
  }, [router]);

  // Also stop loader when pathname changes (for static navigation)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
      <svg className="animate-spin h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  );
}
