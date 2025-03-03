"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingBag, Heart, Star, Share2 } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart } from "@/store/cartSlice";

const translations = {
    en: {
      addToCart: "Add to Cart",
      description: "Description",
      size: "Select Size",
      color: "Select Color",
      reviews: "Reviews",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      relatedProducts: "Related Products",
      details: "Product Details",
      shipping: "Shipping Information",
    },
    ar: {
      addToCart: "أضف إلى السلة",
      description: "الوصف",
      size: "اختر المقاس",
      color: "اختر اللون",
      reviews: "التقييمات",
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      relatedProducts: "منتجات مشابهة",
      details: "تفاصيل المنتج",
      shipping: "معلومات الشحن",
    },
  };

const productsData = {
  1: {
    id: 1,
    name: "Summer Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    description:
      "A beautiful and comfortable summer dress perfect for warm days. Made with high-quality, breathable fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Yellow", "Pink"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  2: {
    id: 2,
    name: "Elegant Blouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    description:
      "An elegant blouse suitable for both casual and formal occasions. Features delicate details and premium fabric.",
    sizes: ["S", "M", "L"],
    colors: ["White", "Black", "Blue"],
    rating: 4.8,
    reviews: 96,
    inStock: true,
  },
};

const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.language.current);
    const t = translations[language as keyof typeof translations];
    const product = productsData[Number(id) as keyof typeof productsData];
    useEffect(() => {
      const tl = gsap.timeline();
      tl.from(".product-image", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".product-info",
        {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }, []);
    if (!product) {
      return <div>Product not found</div>;
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="product-image">
        <div className="aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            fill
          />
        </div>
      </div>
      {/* Product Info */}
      <div className="product-info space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              ({product.reviews} {t.reviews})
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold text-yellow-500">${product.price}</p>
        <div>
          <h3 className="font-semibold mb-2 dark:text-white">
            {t.description}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 dark:text-white">{t.size}</h3>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="px-4 py-2 border rounded hover:border-yellow-500 dark:border-gray-600 dark:text-white"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            {t.addToCart}
          </button>
          <button className="p-3 border rounded-lg hover:border-yellow-500 dark:border-gray-600 dark:text-white">
            <Heart size={20} />
          </button>
          <button className="p-3 border rounded-lg hover:border-yellow-500 dark:border-gray-600 dark:text-white">
            <Share2 size={20} />
          </button>
        </div>
        <div className="pt-6 border-t dark:border-gray-700">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {product.inStock ? t.inStock : t.outOfStock}
          </span>
        </div>
      </div>
    </div>
  </div>
);
};


export default ProductDetailsPage;
