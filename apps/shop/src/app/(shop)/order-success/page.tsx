"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const translations = {
  en: {
    title: "Order Successful!",
    message: "Thank you for your purchase. Your order has been placed successfully.",
    backToHome: "Back to Home"
  },
  ar: {
    title: "تم الطلب بنجاح!",
    message: "شكرًا لك على الشراء. تم تقديم طلبك بنجاح.",
    backToHome: "العودة إلى الصفحة الرئيسية"
  }
};

const OrderSuccess = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{t.title}</h2>
      <p className="text-lg dark:text-gray-300 mb-6">{t.message}</p>
      <Link
        href="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md"
      >
        {t.backToHome}
      </Link>
    </div>
  );
};

export default OrderSuccess;
