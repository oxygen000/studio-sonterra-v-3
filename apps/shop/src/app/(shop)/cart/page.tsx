"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { Trash2 } from "lucide-react";
import { RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";

const translations = {
  en: {
    title: "Shopping Cart",
    empty: "Your cart is empty",
    total: "Total",
    checkout: "Proceed to Checkout",
    continueShopping: "Continue Shopping"
  },
  ar: {
    title: "عربة التسوق",
    empty: "عربة التسوق فارغة",
    total: "المجموع",
    checkout: "متابعة الدفع",
    continueShopping: "مواصلة التسوق"
  }
};

const CartPage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.current);
  const { items, total } = useSelector((state: RootState) => state.cart) as unknown as { items: { id: number; image: string; name: string; price: number }[], total: number };
  const t = translations[language as keyof typeof translations];

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{t.empty}</h2>
        <Link href="/" className="text-yellow-500 hover:text-yellow-600">
          {t.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 dark:text-white">{t.title}</h2>
      <div className="space-y-4">
        {items.map((item: { id: number; image: string; name: string; price: number }) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={96} 
              height={96}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold dark:text-white">{item.name}</h3>
              <p className="text-yellow-500">${item.price}</p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item))}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div className="text-xl font-bold dark:text-white">
          {t.total}: ${total.toFixed(2)}
        </div>
        <Link
          href="/checkout"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md"
        >
          {t.checkout}
        </Link>
      </div>
    </div>
  );
};

export default CartPage;