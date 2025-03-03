"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ShoppingBag, Star } from "lucide-react";
import { RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";

const translations = {
  en: { addToCart: "Add to Cart", viewDetails: "View Details", discount: "Off" },
  ar: { addToCart: "أضف إلى السلة", viewDetails: "عرض التفاصيل", discount: "خصم" },
};

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
}

export const ProductCard = ({ id, name, price, image, rating, discount }: ProductCardProps) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart({ id, name, price, image }));
  };

  const discountedPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative">
      <Link href={`/product/${id}`} className="block">
        <div className="relative w-full aspect-[4/5]">
          <Image src={image} alt={name} width={500} height={300} className="object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>

          {discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {discount}% {t.discount}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>

        <p className="mt-2">
          <span className="text-yellow-500 font-bold text-lg">${discountedPrice}</span>
          {discount && <span className="text-gray-400 line-through text-sm ml-2">${price.toFixed(2)}</span>}
        </p>

        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < rating ? "text-yellow-500" : "text-gray-300"} />
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <ShoppingBag size={20} />
          {t.addToCart}
        </button>

        <Link
          href={`/product/${id}`}
          className="mt-2 block w-full text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          {t.viewDetails}
        </Link>
      </div>
    </div>
  );
};
