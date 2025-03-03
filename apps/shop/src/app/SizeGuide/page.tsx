"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Size Guide",
    description: "Find your perfect fit",
    measurementGuide: "How to Measure",
    sizeChart: "Size Chart",
    bust: "Bust",
    waist: "Waist",
    hips: "Hips",
    inches: "inches",
    cm: "cm",
  },
  ar: {
    title: "دليل المقاسات",
    description: "اعثر على مقاسك المثالي",
    measurementGuide: "كيفية القياس",
    sizeChart: "جدول المقاسات",
    bust: "محيط الصدر",
    waist: "محيط الخصر",
    hips: "محيط الأرداف",
    inches: "بوصة",
    cm: "سم",
  },
};

const sizeChart = {
  XS: { bust: "31-32", waist: "24-25", hips: "34-35" },
  S: { bust: "33-34", waist: "26-27", hips: "36-37" },
  M: { bust: "35-36", waist: "28-29", hips: "38-39" },
  L: { bust: "37-38", waist: "30-31", hips: "40-41" },
  XL: { bust: "39-40", waist: "32-33", hips: "42-43" },
};

const SizeGuidePage = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.from(".size-guide-content", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">
          {t.title}
        </h1>
        <p className="text-yellow-400 dark:text-yellow-300">{t.description}</p>
      </div>
      <div className="size-guide-content bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-yellow-500 dark:text-yellow-400">
          {t.sizeChart}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700 text-yellow-500 dark:text-yellow-400">
                <th className="py-2 text-left">Size</th>
                <th className="py-2 text-left">{t.bust}</th>
                <th className="py-2 text-left">{t.waist}</th>
                <th className="py-2 text-left">{t.hips}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sizeChart).map(([size, measurements]) => (
                <tr key={size} className="border-b dark:border-gray-700">
                  <td className="py-2 font-medium text-yellow-500 dark:text-yellow-400">
                    {size}
                  </td>
                  <td className="py-2 text-yellow-400 dark:text-yellow-300">
                    {measurements.bust}&quot;
                  </td>
                  <td className="py-2 text-yellow-400 dark:text-yellow-300">
                    {measurements.waist}&quot;
                  </td>
                  <td className="py-2 text-yellow-400 dark:text-yellow-300">
                    {measurements.hips}&quot;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
