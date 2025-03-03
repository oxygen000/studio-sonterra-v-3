'use client';
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
const translations = {
  en: {
    title: "Summer Collection 2024",
    subtitle: "Discover our latest arrivals",
    cta: "Shop Now"
  },
 
  ar: {
    title: "مجموعة صيف 2024",
    subtitle: "اكتشف أحدث وصولاتنا",
    cta: "تسوق الآن"
  }
};
export const Hero = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  return <div className="relative w-full h-[600px] bg-yellow-50">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"  fill alt="Fashion banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl mb-8">{t.subtitle}</p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md">
            {t.cta}
          </button>
        </div>
      </div>
    </div>;
};