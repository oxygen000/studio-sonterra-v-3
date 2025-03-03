"use client";
import { useSelector } from "react-redux";
import { Search, Filter } from "lucide-react";
import gsap from "gsap";
import { ProductCard } from "@/app/(products)/ProductCard";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
const translations = {
  en: {
    title: "Our Products",
    search: "Search products...",
    filter: "Filter",
    categories: "Categories",
    price: "Price Range",
    sort: "Sort by",
    all: "All",
    dresses: "Dresses",
    tops: "Tops",
    pants: "Pants",
    accessories: "Accessories"
  },
  ar: {
    title: "منتجاتنا",
    search: "البحث عن المنتجات...",
    filter: "تصفية",
    categories: "الفئات",
    price: "نطاق السعر",
    sort: "ترتيب حسب",
    all: "الكل",
    dresses: "فساتين",
    tops: "بلايز",
    pants: "بناطيل",
    accessories: "إكسسوارات"
  }
};
const products = [
{
  id: 5,
  name: "Evening Gown",
  price: 149.99,
  image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
  category: "dresses",
  rating: 2,
}, {
  id: 6,
  name: "Silk Scarf",
  price: 29.99,
  image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
  category: "accessories",
  rating: 5,
}];
export default function ProductsPage () {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    gsap.from(".product-card", {
      duration: 0.6,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, []);
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);
  return <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{t.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-64 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder={t.search} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4 dark:text-white flex items-center gap-2">
              <Filter size={20} />
              {t.categories}
            </h3>
            <div className="space-y-2">
              {["all", "dresses", "tops", "pants", "accessories"].map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === category ? "bg-yellow-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"}`}>
                    {t[category as keyof typeof t]}
                  </button>)}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => <div key={product.id} className="product-card">
                <ProductCard {...product} />
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};