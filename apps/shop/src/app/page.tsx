import { Hero } from "@/components/Hero";
import ProductGrid from "@/app/(products)/ProductGrid";
import ProductsPage from "./(products)/product/page";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductGrid />
      <ProductsPage />
    </main>
  );
}
